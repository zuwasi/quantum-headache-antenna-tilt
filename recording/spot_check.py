"""Grab frames from demo_final.mp4 at given seconds and tile them for a visual check."""
import subprocess, sys
from PIL import Image, ImageDraw, ImageFont

times = [int(t) for t in sys.argv[1:]] or [5, 75, 90, 130, 160, 190, 215, 230, 300]
font = ImageFont.truetype('C:/Windows/Fonts/seguisb.ttf', 28)
ims = []
for t in times:
    f = f'check_{t:03d}.jpg'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(t), '-i', 'demo_final.mp4', '-frames:v', '1',
                    '-vf', 'scale=1280:-1', f], check=True)
    im = Image.open(f)
    ImageDraw.Draw(im).text((10, 10), f't={t}s ({t//60}:{t%60:02d})', fill='yellow', font=font)
    ims.append(im)
w, h = ims[0].size
cols = 3
rows = (len(ims) + cols - 1) // cols
S = Image.new('RGB', (w * cols, h * rows))
for i, im in enumerate(ims):
    S.paste(im, ((i % cols) * w, (i // cols) * h))
S.save('check_sheet.jpg', quality=80)
print('check_sheet.jpg')
