/* eslint-disable @next/next/no-img-element -- transparent cut-outs on 3D faces; sizes are exact already */
import type { Colourway } from "@/types/off-the-rail";

/** every generated photo is exported 760px tall, cropped from the top of the hook */
export const IMAGE_H = 760;

interface GarmentBoxProps {
  colour: Colourway;
  height: number;
  facing: boolean;
  name: string;
}

/**
 * A garment as a 3D box: front photo on the front face, side photo on the left face.
 * Rest is rotateY(90deg) (side-on), active is rotateY(0) (facing you).
 *
 * The box is pushed back by half the depth of whichever face is showing, so the visible
 * photo always sits on the z=0 plane: perspective never rescales it and the hook stays on the rail.
 */
export function GarmentBox({ colour, height: H, facing, name }: GarmentBoxProps) {
  const fw = (H * colour.front.w) / IMAGE_H;
  const sw = (H * colour.side.w) / IMAGE_H;
  const transform = facing
    ? `translateZ(${-sw / 2}px) rotateY(0deg)`
    : `translateZ(${-fw / 2}px) rotateY(90deg)`;

  return (
    <div
      className={`otr-box${facing ? " is-facing" : ""}`}
      style={{ width: fw, left: -fw / 2, transform }}
    >
      <img
        className="otr-face otr-face--front"
        src={colour.front.src}
        alt={facing ? `${name} in ${colour.name}, front` : ""}
        width={colour.front.w}
        height={colour.front.h}
        draggable={false}
        style={{ left: 0, width: fw, transform: `translateZ(${sw / 2}px)` }}
      />
      <img
        className="otr-face otr-face--side"
        src={colour.side.src}
        alt={facing ? "" : `${name} in ${colour.name}, side on`}
        width={colour.side.w}
        height={colour.side.h}
        draggable={false}
        style={{ left: (fw - sw) / 2, width: sw, transform: `rotateY(-90deg) translateZ(${fw / 2}px)` }}
      />
    </div>
  );
}
