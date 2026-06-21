"""Build coaching page portraits from reference sources.

Primary coaching hero: `assets/nesreen-coaching-generated.png` (AI editorial
with identity guardrails + user reference uploads). Fallback: crop real photos.
"""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(__file__).resolve().parents[1]
REPO = BASE.parent
GENERATED = REPO / "assets" / "nesreen-coaching-generated.png"
HERO = BASE / "nesreen-hero.jpg"
GRAD = BASE / "nesreen-graduation.jpg"
COACHING = BASE / "nesreen-coaching.jpg"
EDITORIAL = BASE / "nesreen-coaching-editorial.jpg"
OUTPUT_SIZE = (1200, 1500)


def crop_to_ratio(
    im: Image.Image,
    ratio_w: int,
    ratio_h: int,
    *,
    anchor_x: float = 0.5,
    anchor_y: float = 0.22,
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
    left = int((w - new_w) * anchor_x)
    top = int((h - new_h) * anchor_y)
    left = max(0, min(left, w - new_w))
    top = max(0, min(top, h - new_h))
    return im.crop((left, top, left + new_w, top + new_h))


def export_portrait(
    src: Path,
    dest: Path,
    *,
    anchor_y: float = 0.22,
) -> None:
    im = Image.open(src).convert("RGB")
    im = ImageOps.exif_transpose(im)
    cropped = crop_to_ratio(im, 4, 5, anchor_y=anchor_y)
    out = cropped.resize(OUTPUT_SIZE, Image.Resampling.LANCZOS)
    out.save(dest, "JPEG", quality=92, optimize=True, subsampling=0)
    print(f"Wrote {dest.name} ({out.size[0]}x{out.size[1]}) from {src.name}")


def backup_if_needed(path: Path, tag: str) -> None:
    if not path.exists():
        return
    backup = BASE / f"nesreen-{tag}-ai-backup.jpg"
    if not backup.exists():
        shutil.copy2(path, backup)
        print(f"Backed up -> {backup.name}")


def export_generated_coaching() -> None:
    im = Image.open(GENERATED).convert("RGB")
    im = ImageOps.exif_transpose(im)
    cropped = crop_to_ratio(im, 4, 5, anchor_y=0.10)
    out = cropped.resize(OUTPUT_SIZE, Image.Resampling.LANCZOS)
    out.save(COACHING, "JPEG", quality=92, optimize=True, subsampling=0)
    print(f"Wrote {COACHING.name} from {GENERATED.name}")


def main() -> None:
    backup_if_needed(COACHING, "coaching")
    backup_if_needed(EDITORIAL, "editorial")
    if GENERATED.exists():
        export_generated_coaching()
    else:
        export_portrait(HERO, COACHING, anchor_y=0.18)
    export_portrait(GRAD, EDITORIAL, anchor_y=0.12)
    print("Done.")


if __name__ == "__main__":
    main()
