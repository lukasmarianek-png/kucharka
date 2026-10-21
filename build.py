#!/usr/bin/env python3
"""Sestaví Kuchařku do dist/: index.html (vše inline, funguje samostatně) + ikony + manifest + sw.js."""
import base64, io, json, pathlib, re
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).parent
SRC, DIST = ROOT / 'src', ROOT / 'dist'
DIST.mkdir(exist_ok=True)

def icon(size):
    s = size * 4
    im = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * .22), fill=(194, 80, 47, 255))
    # hrnec
    w = s * .56; x0 = (s - w) / 2; y0 = s * .44; h = s * .30
    d.rounded_rectangle([x0, y0, x0 + w, y0 + h], radius=int(s * .09), fill=(255, 248, 238, 255))
    d.rectangle([x0, y0, x0 + w, y0 + h * .4], fill=(255, 248, 238, 255))
    d.rounded_rectangle([x0 - s * .07, y0 - s * .015, x0 + w + s * .07, y0 + s * .035], radius=int(s * .02), fill=(255, 248, 238, 255))
    # pára
    for k, cx in enumerate([.40, .5, .60]):
        cx *= s
        pts = [(cx + (s * .025 if (i // 3) % 2 else -s * .025), s * (.18 + i * .022)) for i in range(10)]
        d.line(pts, fill=(255, 248, 238, 230), width=int(s * .028), joint='curve')
    return im.resize((size, size), Image.LANCZOS)

def png_b64(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return base64.b64encode(b.getvalue()).decode()

i180, i192, i512 = icon(180), icon(192), icon(512)
i180.save(DIST / 'apple-touch-icon.png'); i192.save(DIST / 'icon-192.png'); i512.save(DIST / 'icon-512.png')
icon(64).save(DIST / 'favicon.png')

icons_html = (f'<link rel="apple-touch-icon" href="data:image/png;base64,{png_b64(i180)}">\n'
              f'<link rel="icon" type="image/png" href="data:image/png;base64,{png_b64(icon(64))}">')

html = (SRC / 'index.html').read_text()
html = html.replace('<!--ICONS-->', icons_html)
html = html.replace('<!--STYLE-->', '<style>\n' + (SRC / 'style.css').read_text() + '\n</style>')
html = html.replace('<!--DATA-->', (SRC / 'data.js').read_text())
html = html.replace('<!--APP-->', (SRC / 'app.js').read_text())
(DIST / 'index.html').write_text(html)

(DIST / 'manifest.webmanifest').write_text(json.dumps({
    'name': 'Kuchařka', 'short_name': 'Kuchařka', 'lang': 'cs', 'start_url': '/', 'display': 'standalone',
    'background_color': '#F6F0E6', 'theme_color': '#C2502F',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
              {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}]
}, ensure_ascii=False, indent=2))
print('OK', len(html) // 1024, 'kB')
