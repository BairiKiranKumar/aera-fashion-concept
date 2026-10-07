"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Colourway, OffTheRailProduct } from "@/types/off-the-rail";
import { STATUS_LABEL } from "@/data/offTheRailProducts";
import { GarmentBox, IMAGE_H } from "./GarmentBox";

interface OffTheRailRailProps {
  products: OffTheRailProduct[];
  colourFor: (product: OffTheRailProduct) => Colourway;
  activeIndex: number | null;
  scrollMode: boolean;
  onActivate: (index: number | null) => void;
  onOpen: (index: number) => void;
}

const HEADER_H = { desktop: 104, phone: 84 };
const TICKER_H = { desktop: 38, phone: 34 };
/** caption + button block under the rail */
const BELOW_RAIL = 170;

/** rest slot width as a fraction of garment height; side-on garments hang close like a real rail */
const REST_K = { hover: 0.2, scroll: 0.26 };
const GAP_K = 0.06;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function swing(el: HTMLElement | null, degrees: number[], duration: number, delay = 0) {
  if (!el || reducedMotion()) return;
  el.animate(
    degrees.map((d) => ({ transform: `rotate(${d}deg)` })),
    { duration, delay, easing: "ease-in-out" }
  );
}

export function OffTheRailRail({
  products,
  colourFor,
  activeIndex,
  scrollMode,
  onActivate,
  onOpen,
}: OffTheRailRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const swingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [H, setH] = useState(420);
  const [trackW, setTrackW] = useState(1200);
  const [ready, setReady] = useState(false);

  const restSlot = H * (scrollMode ? REST_K.scroll : REST_K.hover);
  const widthOf = (img: { w: number }) => (H * img.w) / IMAGE_H;

  /* ---- size the garments to the viewport ---- */
  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const phone = window.innerWidth < 768;
      const vw = rail.clientWidth;
      const vh = window.innerHeight;
      const header = phone ? HEADER_H.phone : HEADER_H.desktop;
      const ticker = phone ? TICKER_H.phone : TICKER_H.desktop;
      const byHeight = vh - header - ticker - BELOW_RAIL - 48;
      const widest = Math.max(...products.flatMap((p) => p.colourways.map((c) => c.front.w))) / IMAGE_H;
      const byWidth = scrollMode
        ? (vw * 0.74) / widest // leave room for the neighbours to peek in
        : (vw - 120) / ((products.length - 1) * REST_K.hover + widest + GAP_K);
      setH(Math.round(Math.max(240, Math.min(byHeight, byWidth, 560))));
      setTrackW(vw);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [products, scrollMode]);

  /* ---- wait for photos, then drop each garment onto the rail ---- */
  useEffect(() => {
    let cancelled = false;
    const srcs = products.flatMap((p) => {
      const c = colourFor(p);
      return [c.side.src, c.front.src];
    });
    const loads = srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = src;
          img.decode?.().then(() => resolve(), () => resolve());
        })
    );
    const timeout = new Promise<void>((r) => setTimeout(r, 5000));
    Promise.race([Promise.all(loads), timeout]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
    // first paint only: later colour swaps load on demand
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion()) return;
    swingRefs.current.forEach((el, i) => {
      el?.animate(
        [
          { transform: "translateY(-28px) rotate(7deg)", opacity: 0, easing: "cubic-bezier(.5,0,.75,.4)" },
          { transform: "translateY(0) rotate(-3deg)", opacity: 1, offset: 0.36, easing: "ease-in-out" },
          { transform: "rotate(1.2deg)", offset: 0.68, easing: "ease-in-out" },
          { transform: "rotate(0deg)" },
        ],
        { duration: 1100, delay: i * 70, fill: "backwards" }
      );
    });
  }, [ready]);

  /* ---- neighbours slide apart around the active garment ---- */
  const extraFor = useCallback(
    (index: number | null) => {
      if (index === null) return 0;
      const front = colourFor(products[index]).front;
      return Math.max(0, widthOf(front) + H * GAP_K - restSlot);
    },
    // widthOf only depends on H
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, colourFor, H, restSlot]
  );

  const shiftFor = (i: number, index: number | null) => {
    if (index === null || i === index) return 0;
    const half = extraFor(index) / 2;
    return i < index ? -half : half;
  };

  /* ---- swing physics when the active garment changes ---- */
  const prevActive = useRef<number | null>(null);
  useEffect(() => {
    const prev = prevActive.current;
    prevActive.current = activeIndex;
    if (!ready || prev === activeIndex) return;

    // the garment let go turns back and settles
    if (prev !== null) swing(swingRefs.current[prev], [0, 2.4, -1.4, 0.6, 0], 1000);

    // hangers pushed along the rail lag, then overshoot
    products.forEach((_, i) => {
      if (i === activeIndex || i === prev) return;
      const delta = shiftFor(i, activeIndex) - shiftFor(i, prev);
      if (Math.abs(delta) < 4) return;
      const amp = Math.max(-2.2, Math.min(2.2, delta * 0.016));
      swing(swingRefs.current[i], [0, amp, -amp * 0.5, amp * 0.2, 0], 1100, 40);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, ready]);

  /* ---- phone: swipe the rail, the centred garment turns to face you ---- */
  const fromScroll = useRef<number | null>(null);
  const scrollTarget = useRef<number | null>(null);

  const indexAtCentre = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.max(0, Math.min(products.length - 1, Math.round(track.scrollLeft / restSlot)));
  }, [products.length, restSlot]);

  useEffect(() => {
    const track = trackRef.current;
    if (!scrollMode || !track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = indexAtCentre();
        if (scrollTarget.current !== null) {
          if (i !== scrollTarget.current) return;
          scrollTarget.current = null;
        }
        if (i !== activeIndex) {
          fromScroll.current = i;
          onActivate(i);
        }
      });
    };
    // a finger on the rail always wins over a programmatic scroll
    const release = () => {
      scrollTarget.current = null;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", release, { passive: true });
    track.addEventListener("wheel", release, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", release);
      track.removeEventListener("wheel", release);
    };
  }, [scrollMode, activeIndex, indexAtCentre, onActivate]);

  // keep the rail centred on garments chosen elsewhere (product view arrows, keyboard)
  useEffect(() => {
    const track = trackRef.current;
    if (!scrollMode || !track || activeIndex === null) return;
    if (fromScroll.current === activeIndex || indexAtCentre() === activeIndex) return;
    scrollTarget.current = activeIndex;
    track.scrollTo({ left: activeIndex * restSlot, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [scrollMode, activeIndex, restSlot, indexAtCentre]);

  const handleClick = (i: number) => {
    if (scrollMode && i !== activeIndex) {
      fromScroll.current = null;
      onActivate(i);
      return;
    }
    onOpen(i);
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(products.length - 1, i + step));
    buttonRefs.current[next]?.focus();
  };

  const spacer = scrollMode ? Math.max(0, (trackW - restSlot) / 2) : 0;

  const bar = (style?: React.CSSProperties) => (
    <div className="otr-rail__bar" style={style} aria-hidden="true">
      <span className="otr-rail__bracket otr-rail__bracket--l" />
      <span className="otr-rail__tube" />
      <span className="otr-rail__bracket otr-rail__bracket--r" />
    </div>
  );

  return (
    <div
      ref={railRef}
      className={`otr-rail${scrollMode ? " is-scroll" : ""}`}
      style={
        {
          "--gh": `${H}px`,
          "--hook-sit": `${Math.max(2, H * 0.006)}px`,
        } as React.CSSProperties
      }
    >
      {!scrollMode && bar()}

      <div
        ref={trackRef}
        className="otr-rail__track"
        role="list"
        aria-label="This week's rail"
        onPointerLeave={(e) => {
          if (!scrollMode && e.pointerType === "mouse") onActivate(null);
        }}
      >
        {scrollMode && <div className="otr-rail__spacer" style={{ width: spacer }} aria-hidden="true" />}
        {/* on a swiped rail the tube scrolls with the garments, brackets at its real ends */}
        {scrollMode && bar({ left: spacer - restSlot * 0.9, width: restSlot * (products.length + 1.8), right: "auto" })}

        {products.map((product, i) => {
          const colour = colourFor(product);
          const isActive = i === activeIndex;
          const hit = isActive ? widthOf(colour.front) + H * GAP_K : restSlot;
          return (
            <div
              key={product.id}
              role="listitem"
              className={`otr-slot${isActive ? " is-active" : ""}`}
              style={{ width: restSlot }}
              onPointerMove={(e) => {
                if (!scrollMode && e.pointerType === "mouse" && !isActive) onActivate(i);
              }}
            >
              <div className="otr-slot__shift" style={{ transform: `translateX(${shiftFor(i, activeIndex)}px)` }}>
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                className="otr-garment"
                style={{ width: hit, transition: "width var(--otr-turn) var(--otr-ease)" }}
                aria-label={`${product.name}, £${product.price}, ${STATUS_LABEL[product.status]}. Open details`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleClick(i)}
                onFocus={() => {
                  if (!isActive) onActivate(i);
                }}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <div
                  ref={(el) => {
                    swingRefs.current[i] = el;
                  }}
                  className={`otr-swing${ready ? "" : " is-waiting"}`}
                >
                  <GarmentBox colour={colour} height={H} facing={isActive} name={product.name} />
                </div>
              </button>
              </div>
            </div>
          );
        })}

        {scrollMode && <div className="otr-rail__spacer" style={{ width: spacer }} aria-hidden="true" />}
      </div>
    </div>
  );
}
