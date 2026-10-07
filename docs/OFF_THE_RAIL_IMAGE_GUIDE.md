# Off the Rail: garment photo pipeline

Every garment on `/off-the-rail` is a real generated photo, not a vector. Each product has four images:

| File suffix | View | How it's made |
|---|---|---|
| `a-front` | first colourway, front | text prompt |
| `a-side` | first colourway, side profile | `a-front` as image reference |
| `b-front` | second colourway, front | `a-front` as image reference |
| `b-side` | second colourway, side profile | `b-front` + `a-side` as references |

The fourth image (`b-side`) is extra to the brief: it lets a colour picked in the product view also change the side-on garment hanging on the rail.

## 1. Generate (Higgsfield)

```bash
higgsfield auth login
python scripts/off-the-rail/generate.py <raw_dir>
```

- Model: `nano_banana_flash` (Nano Banana 2), aspect ratio 3:4, 1k. About 1.5 credits per image, so about 60 credits for a full set of 40.
- References are passed as Higgsfield job ids, so nothing is re-uploaded.
- The script is resumable. Finished jobs are recorded in `<raw_dir>/manifest.json`. To re-roll specific shots:

```bash
python scripts/off-the-rail/generate.py <raw_dir> --only 03 --redo 03:side
```

All prompts live in `generate.py`. The shared style line is the brief's, word for word. The side prompt drops "between other garments": the model took that literally and put neighbouring clothes and rail bars into the shot. It also adds "hangs completely alone".

## 2. Cut out and align

```bash
python -m pip install "rembg[cpu]" scipy
python scripts/off-the-rail/process.py <raw_dir>
```

For each photo:

1. **Matte.** rembg with `birefnet-general`. `isnet-general-use` from the brief is available via `OTR_MATTE_MODEL=isnet-general-use`, but it dropped whole sleeves on white and ecru fabric.
2. **Cross-check against the sweep.** A quadratic surface is fitted to the grey background. rembg pixels that don't differ from it are vetoed, and strongly differing pixels it missed are added. Interior holes are filled and thin slivers below the hanger are removed.
3. **Rebuild the hook.** Matting models erase most of a thin chrome hook on grey. Above the hanger, the hook is rebuilt from its contrast against the fitted background.
4. **Crop to a shared frame.** The crop starts at the top of the hook, with the hook shaft centred horizontally. It is scaled so the garment is 744px tall on a 760px canvas.
5. **Export** as WebP (quality 88) to `public/images/off-the-rail/`.

The script also writes `src/data/offTheRailAssets.json` with each image's width. The rail uses those widths to size the 3D box faces exactly.

## 3. Runtime

- Rest state: each garment is a CSS 3D box with the front photo on its front face, the side photo on its left face, `rotateY(90deg)` and `perspective: 2000px`. The box is pushed back by half the depth of whichever face is showing, so the visible photo always sits on the z=0 plane and its hook stays on the rail.
- Hook alignment: because every image starts at the hook apex, the tube is drawn a few pixels below the top of each garment.
