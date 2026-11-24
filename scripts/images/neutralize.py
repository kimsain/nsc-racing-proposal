"""Turn the warm beige backdrop of the Codex photos into neutral grey without calling Codex again.

Low-chroma pixels (the beige backdrop, matte black fabric, grey shadows) become pure grey.
High-chroma pixels (the orange tape and zip pulls) keep their hue. Brightness is then mapped so
the backdrop, sampled at the image corners, lands on the --photo token (#F2F2F2 = 242).

Usage:
  python3 scripts/images/neutralize.py            # every photo listed in TARGETS
  python3 scripts/images/neutralize.py r01-singlet
  python3 scripts/images/neutralize.py --check    # only report corner colours of assets/img/*.webp

Reads scripts/images/raw/<name>.png, writes assets/img/<webp>.webp.
"""
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
OUT = HERE.parent.parent / "assets" / "img"
TARGET = 242  # --photo #F2F2F2

# raw png name -> webp name used by the site. transfer-tiedye-panel is dark on purpose; swatch-two-track is unused.
TARGETS = {n: n for n in [
    "r01-singlet", "r01-front", "r01-perf", "r01-hem",
    "r02-hoodsleeve", "r02-back", "r02-cuff", "r02-swatch",
    "r03-shell", "r03-back", "r03-packed", "r03-swatch",
    "r04-tights", "r04-side", "r04-pocket", "r04-swatch",
    "collection-specimens", "lab-permeability",
]}
TARGETS["style-anchor"] = "r01-swatch"


def corners(a):
    """Median colour of four 24px corner patches."""
    h, w = a.shape[:2]
    k = 24
    patches = [a[:k, :k], a[:k, w - k:], a[h - k:, :k], a[h - k:, w - k:]]
    return np.median(np.concatenate([p.reshape(-1, 3) for p in patches]), axis=0)


LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)


def backdrop_lum(a):
    """Backdrop luminance from the corners. Close-ups whose corners are fabric fall back to the style anchor's backdrop."""
    ref = float(corners(np.asarray(Image.open(RAW / "style-anchor.png").convert("RGB")).astype(np.float32)) @ LUMA)
    own = float(corners(a) @ LUMA)
    return own if abs(own - ref) <= 15 else ref


def neutralize(a):
    a = a.astype(np.float32)
    lum = a @ LUMA
    chroma = a.max(axis=2) - a.min(axis=2)
    # 0 below chroma 28 (fully grey), 1 above 70 (keep colour), smooth in between.
    t = np.clip((chroma - 28) / 42, 0, 1)
    keep = t * t * (3 - 2 * t)
    grey = np.repeat(lum[..., None], 3, axis=2)
    mixed = grey + (a - grey) * keep[..., None]
    # Map the backdrop luminance onto TARGET: scale shadows and mid-tones, compress highlights above it.
    bg = backdrop_lum(a)
    out_l = np.where(lum <= bg, lum * TARGET / bg, TARGET + (lum - bg) * (255 - TARGET) / max(1.0, 255 - bg))
    ratio = np.where(lum > 0.5, out_l / np.maximum(lum, 0.5), 1.0)
    return np.clip(mixed * ratio[..., None], 0, 255).round().astype(np.uint8)


def passes(rgb):
    r, g, b = rgb
    return max(r, g, b) - min(r, g, b) <= 2 and abs((r + g + b) / 3 - TARGET) <= 4


def run(name):
    src = RAW / f"{name}.png"
    img = np.asarray(Image.open(src).convert("RGB"))
    out = neutralize(img)
    c = corners(out)
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        Image.fromarray(out).save(tmp.name)
        resize = ["-resize", "1200", "0"] if img.shape[1] >= 1536 else []
        webp = OUT / f"{TARGETS[name]}.webp"
        subprocess.run(["cwebp", "-quiet", "-q", "82", *resize, tmp.name, "-o", str(webp)], check=True)
    return f"{name} -> {TARGETS[name]}.webp corner {tuple(int(v) for v in c)} {'ok' if passes(c) else 'FAIL'}"


def check():
    for p in sorted(OUT.glob("*.webp")):
        c = corners(np.asarray(Image.open(p).convert("RGB")))
        print(f"{p.name}: corner {tuple(int(v) for v in c)} {'ok' if passes(c) else '-'}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["--check"]:
        check()
    else:
        for n in args or list(TARGETS):
            print(run(n), flush=True)
