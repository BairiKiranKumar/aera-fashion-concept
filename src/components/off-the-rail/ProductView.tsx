/* eslint-disable @next/next/no-img-element -- transparent cut-outs, cross-faded by colour */
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Colourway, OffTheRailProduct, SizeCode } from "@/types/off-the-rail";
import { STATUS_LABEL } from "@/data/offTheRailProducts";
import { IMAGE_H } from "./GarmentBox";

interface ProductViewProps {
  open: boolean;
  product: OffTheRailProduct;
  index: number;
  total: number;
  direction: "next" | "prev";
  colour: Colourway;
  notified: boolean;
  onColour: (colour: Colourway) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  onAdd: (size: SizeCode) => void;
  onNotify: () => void;
}

/** widest front photo / height, so the arrows don't jump between garments */
const MAX_RATIO = 0.84;
const HEADER_H = 104;
/** counter, name, description, price, swatches, sizes, button and delivery note */
const INFO_H = 440;
const pad = (n: number) => String(n).padStart(2, "0");

function useGarmentHeight() {
  const [h, setH] = useState(360);
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const phone = vw < 768;
      const arrows = phone ? 2 * (44 + 10) + 16 : 2 * (52 + 36) + 32;
      // ~40% of the screen, but on short laptop screens leave room for the info + button below
      const top = phone ? 96 : Math.max(HEADER_H + 10, vh * 0.18);
      const fits = vh - top - INFO_H - 16;
      const byHeight = phone ? vh * 0.34 : Math.min(vh * 0.4, Math.max(vh * 0.28, fits));
      setH(Math.round(Math.max(200, Math.min(byHeight, (vw - arrows) / MAX_RATIO))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return h;
}

export function ProductView({
  open,
  product,
  index,
  total,
  direction,
  colour,
  notified,
  onColour,
  onPrev,
  onNext,
  onClose,
  onAdd,
  onNotify,
}: ProductViewProps) {
  const H = useGarmentHeight();
  const [size, setSize] = useState<SizeCode | null>(null);
  const [sizeFor, setSizeFor] = useState(product.id);
  const rootRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // a new garment starts without a size picked
  if (sizeFor !== product.id) {
    setSizeFor(product.id);
    setSize(null);
  }

  const drops = product.status === "drops_friday";
  const garmentW = Math.max(...product.colourways.map((c) => (H * c.front.w) / IMAGE_H));
  const arrowOffset = (H * MAX_RATIO) / 2 + (H < 320 ? 6 : 28);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (open) rootRef.current?.focus({ preventScroll: true });
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx > 0) onPrev();
    else onNext();
  };

  const ctaLabel = drops
    ? notified
      ? "We'll email you Friday"
      : "Notify me"
    : size
      ? `Add to bag, £${product.price}`
      : "Pick a size";

  return (
    <div
      ref={rootRef}
      className="otr-view"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name}, ${pad(index + 1)} of ${pad(total)}`}
      aria-hidden={!open}
      tabIndex={-1}
      inert={!open}
      style={{ "--vh-garment": `${H}px` } as React.CSSProperties}
    >
      <div className="otr-view__inner">
        <div className="otr-view__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button
            type="button"
            className="otr-arrow"
            style={{ left: `calc(50% - ${arrowOffset}px)`, transform: "translate(-100%, -50%)" }}
            onClick={onPrev}
            aria-label="Previous garment"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="otr-view__garment" style={{ width: garmentW }}>
            <div
              key={open ? `${product.id}-${direction}` : "closed"}
              className={`otr-view__turn ${open ? `is-entering-${direction}` : ""}`}
            >
              {product.colourways.map((c) => (
                <img
                  key={c.id}
                  className="otr-view__img otr-view__img--layer"
                  src={c.front.src}
                  alt={c.id === colour.id ? `${product.name} in ${c.name}` : ""}
                  width={c.front.w}
                  height={c.front.h}
                  draggable={false}
                  style={{ opacity: c.id === colour.id ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="otr-arrow"
            style={{ left: `calc(50% + ${arrowOffset}px)`, transform: "translate(0, -50%)" }}
            onClick={onNext}
            aria-label="Next garment"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="otr-info" key={product.id}>
          <span className="otr-info__counter">
            {pad(index + 1)} / {pad(total)}
          </span>
          <h2 className="otr-title otr-info__name">{product.name}</h2>
          <p className="otr-info__desc">{product.description}</p>
          <div className="otr-info__row">
            <span className="otr-info__price">£{product.price}</span>
            <span className={`otr-status otr-status--${product.status} otr-ui`}>{STATUS_LABEL[product.status]}</span>
          </div>

          <div className="otr-field">
            <div className="otr-field__label otr-ui">
              Colour <b>{colour.name}</b>
            </div>
            <div className="otr-swatches" role="radiogroup" aria-label="Colour">
              {product.colourways.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={c.id === colour.id}
                  aria-label={c.name}
                  className="otr-swatch"
                  style={{ background: c.hex }}
                  onClick={() => onColour(c)}
                />
              ))}
            </div>
          </div>

          <div className="otr-field">
            <div className="otr-field__label otr-ui">{drops ? "Sizes open Friday" : "Size"}</div>
            <div className="otr-sizes">
              {product.sizes.map(({ size: s, stock }) => {
                const sold = stock === 0;
                const low = !drops && stock > 0 && stock <= 2;
                return (
                  <div className="otr-size" key={s}>
                    <button
                      type="button"
                      className={`otr-size__chip${sold && !drops ? " is-sold" : ""}`}
                      disabled={sold || drops}
                      aria-pressed={size === s}
                      aria-label={sold ? `${s}, sold out` : low ? `${s}, only ${stock} left` : s}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                    {low && <span className="otr-size__note">Only {stock} left</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={`otr-cta otr-ui${drops && notified ? " is-done" : ""}`}
            disabled={!drops && !size}
            onClick={() => {
              if (drops) {
                if (!notified) onNotify();
              } else if (size) {
                onAdd(size);
              }
            }}
          >
            {ctaLabel}
          </button>
          <p className="otr-delivery">Free UK delivery over £60. Free returns within 30 days.</p>
        </div>
      </div>
    </div>
  );
}
