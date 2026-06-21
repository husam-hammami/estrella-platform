"""Regenerate the 4 Library book covers as clean typographic covers.

Replaces the AI-generated covers (which had a wrong author name baked in) with
on-brand covers: design-system per-book gradient + Cormorant serif title +
correct author. Aspect 2:3 to match .book-cover.
"""
from __future__ import annotations
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

FINAL = Path(r"C:/Users/husam/OneDrive/Documents/Estrella_Final")
OUT_DIRS = [FINAL / "estrella" / "Assets", FINAL / "Assets"]
FONT = "C:/Windows/Fonts/CormorantInfant-{}.ttf"
W, H = 1000, 1500
AUTHOR = "NESREEN ABDELHAKIM"

# per-book gradients mirror .book-cover.b1..b4 in index.html
BOOKS = [
    dict(file="Quiet_Power.png",      t=["Quiet", "Power"],            sub="Leadership without burnout",     c1=(91, 75, 138),  c2=(46, 39, 82)),
    dict(file="Career_Compass.png",   t=["Career", "Compass"],         sub="Direction when you feel lost",   c1=(184, 152, 92), c2=(151, 121, 63)),
    dict(file="Interview_Playbook.jpg", t=["The Interview", "Playbook"], sub="Land the offer with confidence", c1=(95, 191, 184), c2=(42, 122, 117)),
    dict(file="Reset_Journal.png",    t=["The Reset", "Journal"],      sub="90-day burnout recovery",        c1=(232, 155, 168), c2=(184, 83, 123)),
]


def fnt(variant, size):
    return ImageFont.truetype(FONT.format(variant), size)


def gradient(c1, c2):
    yy, xx = np.mgrid[0:H, 0:W]
    t = (xx + yy) / (W + H)
    a, b = np.array(c1, float), np.array(c2, float)
    arr = a[None, None] * (1 - t)[..., None] + b[None, None] * t[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"), "RGB")


def vignette(img, strength=0.32):
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    d = np.sqrt((xx - W / 2) ** 2 + (yy - H / 2) ** 2)
    d /= d.max()
    arr = np.array(img, float) * (1 - strength * d ** 2)[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"), "RGB")


def spaced(draw, cx, y, text, font, fill, tracking):
    widths = [draw.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill, anchor="lm")
        x += w + tracking


def star(draw, cx, cy, r, fill):
    pts = []
    for i in range(8):
        ang = math.pi / 2 + i * math.pi / 4
        rad = r if i % 2 == 0 else r * 0.36
        pts.append((cx + rad * math.cos(ang), cy - rad * math.sin(ang)))
    draw.polygon(pts, fill=fill)


def fit_title(draw, lines, maxw, start=140):
    size = start
    while size > 64:
        f = fnt("SemiBold", size)
        if all(draw.textlength(l, font=f) <= maxw for l in lines):
            return f, size
        size -= 3
    return fnt("SemiBold", 64), 64


for bk in BOOKS:
    img = vignette(gradient(bk["c1"], bk["c2"]))
    d = ImageDraw.Draw(img, "RGBA")

    # subtle keyline frame
    d.rectangle([34, 34, W - 34, H - 34], outline=(255, 255, 255, 38), width=2)

    # emblem + wordmark
    star(d, W / 2, 188, 27, (255, 255, 255, 235))
    spaced(d, W / 2, 268, "ESTRELLA", fnt("Medium", 30), (255, 255, 255, 200), 14)

    # title (auto-fit)
    tf, tsize = fit_title(d, bk["t"], W - 170)
    line_h = tsize * 1.02
    cy = 620 - (len(bk["t"]) - 1) * line_h / 2
    for i, line in enumerate(bk["t"]):
        d.text((W / 2, cy + i * line_h), line, font=tf, fill=(255, 255, 255, 255), anchor="mm")

    # divider + subtitle
    ry = 620 + (len(bk["t"]) - 1) * line_h / 2 + tsize * 0.74
    d.line([(W / 2 - 64, ry), (W / 2 + 64, ry)], fill=(255, 255, 255, 150), width=2)
    d.text((W / 2, ry + 86), bk["sub"], font=fnt("Italic", 47), fill=(255, 255, 255, 210), anchor="mm")

    # author + edition footer
    spaced(d, W / 2, 1356, AUTHOR, fnt("Medium", 31), (255, 255, 255, 230), 8)
    spaced(d, W / 2, 1408, "ESTRELLA · DIGITAL EDITION", fnt("Medium", 19), (255, 255, 255, 130), 7)

    for od in OUT_DIRS:
        od.mkdir(parents=True, exist_ok=True)
        p = od / bk["file"]
        if p.suffix.lower() in (".jpg", ".jpeg"):
            img.convert("RGB").save(p, "JPEG", quality=92)
        else:
            img.save(p, "PNG")
    print("wrote", bk["file"])

print("done")
