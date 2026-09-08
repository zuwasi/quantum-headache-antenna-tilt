# Cut the live-run segments out of raw_take.mp4 and join them (no banners yet).
# Segments (raw time): 1:27-2:21 terminal + Classiq synthesis + circuit viewer, 3:08-3:30 Classiq jobs page.
# Then: C:\Python312\python.exe add_headlines.py live_take.mp4 live_runs.mp4 --headlines headlines_live.json
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$segs = @(@(87, 141), @(188, 210))
$list = @()
for ($i = 0; $i -lt $segs.Count; $i++) {
  $f = "_seg$i.mp4"
  ffmpeg -y -v error -ss $segs[$i][0] -to $segs[$i][1] -i raw_take.mp4 -r 30 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -an $f
  $list += "file '$f'"
}
$list | Set-Content -Encoding ascii _concat.txt
ffmpeg -y -v error -f concat -safe 0 -i _concat.txt -c copy live_take.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 live_take.mp4
