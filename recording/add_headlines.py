"""Burn timed headline banners into a (silent) screen recording with ffmpeg.

Usage (workdir C:\\Projects\\Hackton\\group\\recording):
  C:\\Python312\\python.exe add_headlines.py <input.mp4> [output.mp4] [--headlines headlines.json]

headlines.json: list of {"start": "m:ss", "end": "m:ss", "text": "..."}; times may also be seconds.
Banner: translucent dark bar at the bottom, Segoe UI Semibold, fades in/out 0.3 s.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
FONT = "C\\:/Windows/Fonts/seguisb.ttf"  # Segoe UI Semibold; ffmpeg needs the escaped colon


def secs(v):
    if isinstance(v, (int, float)):
        return float(v)
    parts = [float(p) for p in str(v).split(":")]
    return parts[0] * 60 + parts[1] if len(parts) == 2 else parts[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("output", nargs="?")
    ap.add_argument("--headlines", default=str(HERE / "headlines.json"))
    ap.add_argument("--fontsize", type=int, default=44)
    ap.add_argument("--start", type=float, default=0.0,
                    help="trim this many seconds from the start; headline times are relative to the trimmed video")
    a = ap.parse_args()

    src = Path(a.input).resolve()
    out = Path(a.output).resolve() if a.output else src.with_name(src.stem + "_headlines.mp4")
    items = json.loads(Path(a.headlines).read_text(encoding="utf-8"))

    txtdir = HERE / "_txt"
    txtdir.mkdir(exist_ok=True)
    filters = []
    for i, it in enumerate(items):
        s, e = secs(it["start"]), secs(it["end"])
        tf = txtdir / f"h{i:02d}.txt"
        tf.write_text(it["text"], encoding="utf-8")
        en = f"between(t,{s},{e})"
        # alpha ramps 0→1 over the first 0.3 s and 1→0 over the last 0.3 s of the interval
        alpha = f"if(lt(t,{s}+0.3),(t-{s})/0.3,if(gt(t,{e}-0.3),({e}-t)/0.3,1))"
        filters.append(
            f"drawbox=x=0:y=ih-{a.fontsize*2+20}:w=iw:h={a.fontsize*2+20}:color=0x0B1020@0.78:t=fill:enable='{en}'"
        )
        filters.append(
            f"drawtext=fontfile='{FONT}':textfile='_txt/h{i:02d}.txt':expansion=none:fontsize={a.fontsize}:fontcolor=white"
            f":alpha='{alpha}':x=(w-text_w)/2:y=h-{a.fontsize*2+20}+{a.fontsize//2}+10:enable='{en}'"
        )
    script = HERE / "_filters.txt"
    script.write_text(",\n".join(filters), encoding="utf-8")

    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning", "-stats", "-ss", str(a.start), "-i", str(src),
           "-filter_script:v", "_filters.txt", "-c:v", "libx264", "-preset", "medium", "-crf", "19",
           "-pix_fmt", "yuv420p", "-an", str(out)]
    print(" ".join(cmd))
    r = subprocess.run(cmd, cwd=HERE)
    if r.returncode:
        sys.exit(r.returncode)
    print("written:", out)


if __name__ == "__main__":
    main()
