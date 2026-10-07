"""Cut out and align Off the Rail garment photos.

rembg removes the grey sweep, then each image is cropped to a
frame that starts at the very top of the hook with the hook shaft centred, scaled
to a common height and exported as 760px-tall WebP. Image widths are written to
src/data/offTheRailAssets.json so the 3D box faces can be sized exactly.

Matting model: birefnet-general by default. The brief's isnet-general-use is available via
OTR_MATTE_MODEL=isnet-general-use, but it cut holes in light fabrics (ecru, white) on the grey sweep.

Usage: python scripts/off-the-rail/process.py <raw_dir> [--only 01,02]
"""
import json
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "images" / "off-the-rail"
ASSETS_JSON = ROOT / "src" / "data" / "offTheRailAssets.json"

CANVAS_H = 760
CONTENT_H = 744  # leaves a little air under the hem
ALPHA_MIN = 48

SLUGS = {
    "01": "reach-shirt", "02": "scrawl-tee", "03": "blend-in-tee", "04": "two-faces-tee",
    "05": "unbothered-tee", "06": "ink-drip-shirt", "07": "fern-tee", "08": "holding-on-crew",
    "09": "cloud-nine-tee", "10": "one-of-one-tee",
}
KINDS = {"front": "a-front", "side": "a-side", "alt-front": "b-front", "alt-side": "b-side"}


def hook_axis(mask):
    """x of the hook shaft: the narrow run of rows above the hanger, averaged near its bottom."""
    rows = np.where(mask.any(axis=1))[0]
    top = rows[0]
    w = mask.shape[1]
    hook_rows = []
    for y in range(top, min(top + int(mask.shape[0] * 0.14), mask.shape[0])):
        xs = np.where(mask[y])[0]
        if xs.size == 0:
            continue
        if xs[-1] - xs[0] > w * 0.11:
            break
        hook_rows.append((xs[0] + xs[-1]) / 2)
    if len(hook_rows) < 4:
        xs = np.where(mask[top])[0]
        return top, float(xs.mean())
    tail = hook_rows[int(len(hook_rows) * 0.6):]
    return top, float(np.median(tail))


def largest_component(mask):
    labels, n = ndimage.label(mask)
    if n <= 1:
        return mask
    sizes = ndimage.sum(mask, labels, range(1, n + 1))
    return labels == (int(np.argmax(sizes)) + 1)


def clean_alpha(rgb, alpha):
    """rembg loses most of a thin chrome hook on grey, and leaves odd slivers.

    Below the hanger: morphological opening drops thin strays, then keep the main body.
    Above the hanger: rebuild the hook from its contrast against the plain sweep.
    """
    h, w = alpha.shape
    rembg_mask = alpha > ALPHA_MIN

    # The sweep is a smooth gradient: fit it with a quadratic surface from pixels rembg calls background,
    # then use distance-from-sweep both to veto rembg false positives and to fill light fabric it missed.
    yy, xx = np.mgrid[0:h:4, 0:w:4]
    sample = ~ndimage.binary_dilation(rembg_mask, iterations=12)[::4, ::4]
    X = np.stack([np.ones_like(xx), xx / w, yy / h, (xx / w) ** 2, (yy / h) ** 2, xx * yy / (w * h)], -1)
    coef, *_ = np.linalg.lstsq(X[sample], rgb[::4, ::4][sample].astype(np.float32), rcond=None)
    gy, gx = np.mgrid[0:h, 0:w].astype(np.float32)
    G = np.stack([np.ones((h, w), np.float32), gx / w, gy / h, (gx / w) ** 2, (gy / h) ** 2, gx * gy / (w * h)], -1)
    diff = np.abs(rgb.astype(np.float32) - G @ coef).max(axis=2)
    matte = (rembg_mask & ((alpha >= 230) | (diff > 7))) | (diff > 26)
    alpha = np.maximum(alpha, (ndimage.gaussian_filter(matte.astype(np.float32), 0.8) * 255).astype(np.uint8))
    alpha = np.where(ndimage.binary_dilation(matte, iterations=1), alpha, 0)

    body = largest_component(matte)
    rows = np.where(body.any(axis=1))[0]
    # the hanger is the first run of solidly filled rows; the hook's arc is wide but sparse
    filled = body.sum(axis=1) > w * 0.05
    hanger_top = rows[0]
    for y in rows:
        if filled[y : y + 6].all():
            hanger_top = y
            break
    xs = np.where(body[hanger_top])[0]
    cx0 = (xs[0] + xs[-1]) / 2

    lower = np.zeros_like(body)
    cut_y = int(hanger_top + h * 0.04)
    lower[cut_y:] = body[cut_y:]
    k = max(3, w // 110)
    opened = ndimage.binary_opening(lower, structure=np.ones((k, k)))
    body[cut_y:] = opened[cut_y:]
    body = ndimage.binary_fill_holes(largest_component(body))
    keep = ndimage.binary_dilation(body, iterations=2)
    out = np.where(keep, alpha, 0).astype(np.float32)
    interior = ndimage.binary_erosion(body, iterations=2)
    out[interior] = 255

    # hook zone: above the hanger, around its centre line
    y1 = int(hanger_top + h * 0.012)
    x0, x1 = int(max(0, cx0 - w * 0.16)), int(min(w, cx0 + w * 0.16))
    # local per-row background: robust when other garments at the frame edges skew the global fit
    patch = rgb[:y1, x0:x1].astype(np.float32)
    zone = np.abs(patch - np.median(patch, axis=1, keepdims=True)).max(axis=2)
    hook = ndimage.binary_closing(zone > 8, structure=np.ones((5, 3)))
    labels, n = ndimage.label(hook)
    if n:
        sizes = ndimage.sum(hook, labels, range(1, n + 1))
        hook = np.isin(labels, [i + 1 for i, s in enumerate(sizes) if s >= 20])
        soft = np.clip((zone - 4) / 11, 0, 1) * 255
        soft = np.where(ndimage.binary_dilation(hook, iterations=1), soft, 0)
        region = out[:y1, x0:x1]
        out[:y1, x0:x1] = np.maximum(region, soft)
    return out.astype(np.uint8)


def process(src, session):
    img = Image.open(src).convert("RGB")
    cut = remove(img, session=session, post_process_mask=True)
    a = np.array(cut)
    rgb = np.array(img)
    a[:, :, 3] = clean_alpha(rgb, a[:, :, 3])
    a[:, :, :3] = rgb  # rembg blanks colour where it dropped alpha; the rebuilt hook needs it back
    cut = Image.fromarray(a, "RGBA")
    mask = a[:, :, 3] > ALPHA_MIN
    cols = np.where(mask.any(axis=0))[0]
    rows = np.where(mask.any(axis=1))[0]
    top, cx = hook_axis(mask)
    bottom = rows[-1]
    left, right = cols[0], cols[-1]

    scale = CONTENT_H / (bottom - top + 1)
    half = max(cx - left, right - cx) + 6
    box = (int(round(cx - half)), int(top), int(round(cx + half)), int(bottom + 1))
    crop = cut.crop(box)
    w = max(2, int(round(crop.width * scale)))
    crop = crop.resize((w, CONTENT_H), Image.LANCZOS)
    canvas = Image.new("RGBA", (w, CANVAS_H), (0, 0, 0, 0))
    canvas.paste(crop, (0, 0))
    return canvas


def main():
    raw = Path(sys.argv[1])
    only = None
    if "--only" in sys.argv:
        only = set(sys.argv[sys.argv.index("--only") + 1].split(","))
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    assets = json.loads(ASSETS_JSON.read_text()) if ASSETS_JSON.exists() else {}
    session = new_session(os.environ.get("OTR_MATTE_MODEL", "birefnet-general"))

    for num, slug in SLUGS.items():
        if only and num not in only:
            continue
        for kind, suffix in KINDS.items():
            src = raw / f"{num}-{kind}.webp"
            if not src.exists():
                print("missing", src.name)
                continue
            out = process(src, session)
            name = f"{num}-{slug}-{suffix}.webp"
            out.save(OUT_DIR / name, "WEBP", quality=88, method=6)
            assets.setdefault(num, {})[suffix] = {"src": f"/images/off-the-rail/{name}", "w": out.width, "h": out.height}
            print("ok", name, out.size)

    ASSETS_JSON.write_text(json.dumps(dict(sorted(assets.items())), indent=2) + "\n")


if __name__ == "__main__":
    main()
