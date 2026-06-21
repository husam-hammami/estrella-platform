"""Export generated home + coaching portraits into estrella/*.jpg."""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(__file__).resolve().parents[1]
REPO = BASE.parent
ASSETS = REPO / "assets"
OUTPUT_SIZE = (1200, 1500)

SOURCES = {
    "nesreen-hero.jpg": ASSETS / "nesreen-hero-generated.png",
    "nesreen-coaching.jpg": ASSETS / "nesreen-coaching-generated-v2.png",
}


def crop_to_ratio(
    im: Image.Image,
    ratio_w: int,
    ratio_h: int,
    *,
    anchor_y: float = 0.12,
) -> Image.Image:
    w, h = im.size
    target = ratio_w / ratio_h
    current = w / h
    if current > target:
        new_w = int(h * target)
        new_h = h
    else:
        new_w = w
        new_h = int(w / target)
    left = (w - new_w) // 2
    top = int((h - new_h) * anchor_y)
    top = max(0, min(top, h - new_h))
    return im.crop((left, top, left + new_w, top + new_h))


def export(src: Path, dest: Path, *, anchor_y: float = 0.12) -> None:
    if not src.exists():
        raise FileNotFoundError(src)
    if dest.exists():
        backup = dest.with_name(dest.stem + "-previous-backup" + dest.suffix)
        if not backup.exists():
            shutil.copy2(dest, backup)
    im = ImageOps.exif_transpose(Image.open(src).convert("RGB"))
    out = crop_to_ratio(im, 4, 5, anchor_y=anchor_y).resize(
        OUTPUT_SIZE, Image.Resampling.LANCZOS
    )
    out.save(dest, "JPEG", quality=92, optimize=True, subsampling=0)
    print(f"{dest.name} <- {src.name} ({out.size[0]}x{out.size[1]})")


def main() -> None:
    for dest_name, src in SOURCES.items():
        export(src, BASE / dest_name, anchor_y=0.10)


if __name__ == "__main__":
    main()
