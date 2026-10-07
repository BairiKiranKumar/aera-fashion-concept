"""Generate Off the Rail garment photos with Higgsfield (Nano Banana 2).

Per product: front, side (ref: front), alt colourway front (ref: front),
alt colourway side (refs: alt front + side). Resumable: finished jobs are
recorded in manifest.json and skipped on re-run.

Usage: python scripts/off-the-rail/generate.py <out_dir> [--only 03,07] [--redo 03:side]
"""
import json
import os
import shutil
import subprocess
import sys
import threading
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

MODEL = "nano_banana_flash"  # "Nano Banana 2"
RESOLUTION = "1k"

STYLE = (
    "E-commerce product photo, garment hanging on a dark cherry wooden hanger with a thin chrome hook, "
    "shot perfectly straight-on, centred, whole garment and hook visible with space around it, "
    "soft even studio light, plain seamless solid light grey background, no people, no props, "
    "photorealistic premium catalog shot."
)

SIDE = (
    "The exact same garment on the exact same wooden hanger from the reference, rotated 90 degrees so we see it "
    "from the side, as if hanging on a clothes rail. Side profile view: garment appears "
    "narrow, print barely visible as an edge, one sleeve folded toward the viewer, hanger edge-on, chrome hook at "
    "top centre. Same colours, same lighting, same plain light grey background. Whole garment and hook visible with "
    "space around it. The garment hangs completely alone: no other garments, no clothes rail bar, no other hangers "
    "anywhere in the frame."
)

COLOURWAY = (
    "Exact same photo, same garment, same hanger, same framing, same artwork, but the fabric is {fabric} and the "
    "print is {print}. Plain seamless solid light grey background."
)

ALT_SIDE = (
    "Side profile photo of the garment from the first reference image (keep its exact fabric colour {fabric} and "
    "print colour {print}), posed exactly like the second reference image: rotated 90 degrees, hanging edge-on from "
    "the same dark cherry wooden hanger, chrome hook at top centre, garment appears narrow, one sleeve folded toward "
    "the viewer, print barely visible as an edge. Same framing, same lighting, plain seamless solid light grey "
    "background. The garment hangs completely alone: no other garments, no clothes rail bar, no other hangers."
)

PRODUCTS = [
    ("01", "reach-shirt", "Crisp white boxy short-sleeve camp-collar button-up shirt. One giant black dry-brush painted hand reaching up from the hem, fingers spread wide across the chest and over the button placket, rough bristle texture and paint splatter", ("black", "bone-white")),
    ("02", "scrawl-tee", "Black heavyweight oversized boxy tee with dropped shoulders. Huge hot orange spray-paint graffiti scrawl looping across the lower front and wrapping off the side hem, raw drips and overspray, tiny neat white text block on the left chest", ("chalk white", "cobalt blue spray paint")),
    ("03", "blend-in-tee", "Off-white oversized heavyweight tee. Large scratchy handwritten red marker lettering stacked across the front: 'I DIDN'T COME HERE TO BLEND IN', one word underlined, small hand-drawn star", ("black", "red marker")),
    ("04", "two-faces-tee", "Washed charcoal garment-dyed oversized tee with faded vintage texture. Oversized chalk-white single continuous line drawing of two faces in profile looking at each other, cracked vintage ink", ("sand beige", "charcoal line art")),
    ("05", "unbothered-tee", "Deep burgundy heavyweight boxy tee. The word 'UNBOTHERED' in huge ultra-condensed cream letters running vertically from collar to hem, tiny gold foil star and small text 'LONDON / SS26'", ("deep forest green", "cream letters with the same tiny gold foil star")),
    ("06", "ink-drip-shirt", "Olive green short-sleeve camp-collar shirt. Bold black ink brush strokes sweeping across both shoulders and dripping down the front panels, expressive abstract paint art, cream buttons", ("ecru off-white", "navy blue ink strokes")),
    ("07", "fern-tee", "White oversized tee with an all-over cyanotype print in rich Prussian blue of fern leaves and wild grasses, botanical shapes left white inside the blue, running off the edges", ("white", "rust terracotta cyanotype-style toning instead of Prussian blue")),
    ("08", "holding-on-crew", "Black heavyweight crewneck sweatshirt with ribbed cuffs and hem. Bone-white chain-stitch embroidery of two skeleton hands clasped together over the chest, fine thread texture visible", ("heather grey marl", "black chain-stitch embroidery")),
    ("09", "cloud-nine-tee", "Soft sky blue oversized tee. Chunky raised white 3D puff-print clouds drifting up from the hem across the lower front and side, tiny chest text 'HEAD IN THE CLOUDS'", ("soft lilac", "the same white 3D puff-print clouds")),
    ("10", "one-of-one-tee", "Stone beige oversized tee. One giant black fingerprint covering the whole front, ridges printed with a cracked distressed texture, tiny text 'ONE OF ONE' under the collar", ("black", "acid lime green")),
]

lock = threading.Lock()

# The npm shim is a .cmd on Windows; call node directly so prompts with quotes survive.
_shim = shutil.which("higgsfield")
_js = Path(_shim).parent / "node_modules" / "@higgsfield" / "cli" / "bin" / "higgsfield.js" if _shim else None
HF = ["node", str(_js)] if os.name == "nt" and _js and _js.exists() else ["higgsfield"]


def run_job(prompt, refs):
    cmd = [*HF, "generate", "create", MODEL, "--prompt", prompt,
           "--aspect_ratio", "3:4", "--resolution", RESOLUTION, "--wait", "--wait-timeout", "15m", "--json"]
    for r in refs:
        cmd += ["--image-references", r]
    out = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    if out.returncode != 0:
        raise RuntimeError(out.stderr or out.stdout)
    start = out.stdout.find("[")
    job = json.loads(out.stdout[start:])[0]
    if job.get("status") != "completed":
        raise RuntimeError(f"job {job.get('id')} status {job.get('status')}")
    return job["id"], job.get("min_result_url") or job["result_url"]


def main():
    out_dir = Path(sys.argv[1])
    out_dir.mkdir(parents=True, exist_ok=True)
    only = None
    redo = set()
    args = sys.argv[2:]
    for i, a in enumerate(args):
        if a == "--only":
            only = set(args[i + 1].split(","))
        if a == "--redo":
            redo = set(args[i + 1].split(","))

    manifest_path = out_dir / "manifest.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    for key in redo:
        manifest.pop(key, None)

    def step(num, kind, prompt, refs):
        key = f"{num}:{kind}"
        if key in manifest:
            return manifest[key]["id"]
        print(f"-> {key}", flush=True)
        job_id, url = run_job(prompt, refs)
        dest = out_dir / f"{num}-{kind}.webp"
        urllib.request.urlretrieve(url, dest)
        with lock:
            manifest[key] = {"id": job_id, "url": url}
            manifest_path.write_text(json.dumps(manifest, indent=2))
        print(f"OK {key} {job_id}", flush=True)
        return job_id

    def product(p):
        num, slug, front_desc, (fabric, print_) = p
        try:
            front = step(num, "front", f"{front_desc}. {STYLE}", [])
            with ThreadPoolExecutor(2) as ex:
                side_f = ex.submit(step, num, "side", SIDE, [front])
                alt_f = ex.submit(step, num, "alt-front", COLOURWAY.format(fabric=fabric, print=print_), [front])
                side, alt = side_f.result(), alt_f.result()
            step(num, "alt-side", ALT_SIDE.format(fabric=fabric, print=print_), [alt, side])
        except Exception as e:  # keep the other products going
            print(f"FAIL {num}: {e}", flush=True)

    todo = [p for p in PRODUCTS if only is None or p[0] in only]
    with ThreadPoolExecutor(5) as ex:
        list(ex.map(product, todo))
    print("done", len(manifest), "images")


if __name__ == "__main__":
    main()
