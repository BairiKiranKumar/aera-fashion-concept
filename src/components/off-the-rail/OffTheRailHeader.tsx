"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

interface OffTheRailHeaderProps {
  viewing: boolean;
  bagCount: number;
  /** increments on every add, to replay the counter bump */
  bump: number;
  onAbout: () => void;
  onContact: () => void;
  onBag: () => void;
  onClose: () => void;
}

export function OffTheRailHeader({ viewing, bagCount, bump, onAbout, onContact, onBag, onClose }: OffTheRailHeaderProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const bagRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!bump || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    countRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.45)", offset: 0.35 }, { transform: "scale(0.92)", offset: 0.7 }, { transform: "scale(1)" }],
      { duration: 520, easing: "ease-out" }
    );
    bagRef.current?.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(-9deg)", offset: 0.3 }, { transform: "rotate(6deg)", offset: 0.6 }, { transform: "rotate(0)" }],
      { duration: 560, easing: "ease-out" }
    );
  }, [bump]);

  return (
    <header className="otr-header">
      <div className="otr-header__side otr-dimmable" inert={viewing}>
        <button type="button" className="otr-navlink otr-ui" onClick={onAbout}>
          About
        </button>
      </div>

      <div className="otr-dimmable" inert={viewing}>
        <Link href="/off-the-rail" className="otr-logo" aria-label="Off the Rail, home">
          <span>Off the</span>
          <span>Rail</span>
        </Link>
      </div>

      <div className="otr-header__side otr-header__side--right">
        <div className="otr-header__right-slot">
          <button type="button" className="otr-navlink otr-ui otr-dimmable" onClick={onContact} inert={viewing}>
            Contact
          </button>
          <button
            type="button"
            className="otr-navlink otr-ui otr-close"
            onClick={onClose}
            style={{ position: "absolute", right: 0 }}
            tabIndex={viewing ? 0 : -1}
            aria-hidden={!viewing}
          >
            Close <span className="otr-close__x" aria-hidden="true" />
          </button>
        </div>
        <button
          ref={bagRef}
          type="button"
          className="otr-bag"
          onClick={onBag}
          aria-label={`Bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8h14l-1.1 12.1a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9L5 8Z" />
            <path d="M9 10V6.5a3 3 0 0 1 6 0V10" strokeLinecap="round" />
          </svg>
          <span ref={countRef} className="otr-bag__count otr-ui">
            {bagCount}
          </span>
        </button>
      </div>
    </header>
  );
}
