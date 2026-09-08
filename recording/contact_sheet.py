"""Tile the 1-fps frames into labeled contact sheets (30 per sheet) to locate cut points."""
import glob, os
from PIL import Image, ImageDraw, ImageFont

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frames')
files = sorted(glob.glob(os.path.join(D, 'f*.jpg')))
font = ImageFont.truetype('C:/Windows/Fonts/seguisb.ttf', 22)
per, cols = 30, 5
tw, th = 320, 200
for si in range(0, len(files), per):
    chunk = files[si:si + per]
    rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * tw, rows * (th + 26)), 'black')
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(chunk):
        im = Image.open(f).resize((tw, th))
        x, y = (i % cols) * tw, (i // cols) * (th + 26)
        sheet.paste(im, (x, y + 26))
        sec = int(os.path.basename(f)[1:4]) - 1  # f001 = t=0s
        d.text((x + 4, y + 2), f't={sec}s ({sec // 60}:{sec % 60:02d})', fill='yellow', font=font)
    out = os.path.join(D, f'sheet_{si // per + 1:02d}.jpg')
    sheet.save(out, quality=80)
    print(out)
