"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { OFF_THE_RAIL_PRODUCTS } from "@/data/offTheRailProducts";
import type { BagItem, Colourway, OffTheRailProduct, SizeCode } from "@/types/off-the-rail";
import { OffTheRailHeader } from "@/components/off-the-rail/OffTheRailHeader";
import { OffTheRailRail } from "@/components/off-the-rail/OffTheRailRail";
import { OffTheRailCaption } from "@/components/off-the-rail/OffTheRailCaption";
import { OffTheRailTicker } from "@/components/off-the-rail/OffTheRailTicker";
import { ProductView } from "@/components/off-the-rail/ProductView";
import { OffTheRailSheet, type SheetKind } from "@/components/off-the-rail/OffTheRailSheet";
import { BagToast, type Toast } from "@/components/off-the-rail/BagToast";

const SCROLL_QUERY = "(max-width: 767px), (hover: none)";

/** phones and touch screens swipe the rail instead of hovering it */
function useScrollMode() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(SCROLL_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(SCROLL_QUERY).matches,
    () => false
  );
}

export default function OffTheRailPage() {
  const products = OFF_THE_RAIL_PRODUCTS;
  const scrollMode = useScrollMode();

  const [hovered, setHovered] = useState<number | null>(null);
  const [colourIds, setColourIds] = useState<Record<string, string>>({});
  const [viewing, setViewing] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);
  const [sheet, setSheet] = useState<SheetKind | null>(null);
  const [notified, setNotified] = useState<Set<string>>(() => new Set());
  const openerRef = useRef<HTMLElement | null>(null);

  // on a swiped rail something is always centred and facing you
  const active = scrollMode ? (hovered ?? 0) : hovered;

  const colourFor = useCallback(
    (p: OffTheRailProduct): Colourway => p.colourways.find((c) => c.id === colourIds[p.id]) ?? p.colourways[0],
    [colourIds]
  );

  const fromPrice = useMemo(() => Math.min(...products.map((p) => p.price)), [products]);
  const bagCount = bag.reduce((n, item) => n + item.quantity, 0);

  const openView = useCallback((index: number) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setViewIndex(index);
    setDirection("next");
    setViewing(true);
  }, []);

  const closeView = useCallback(() => {
    setViewing(false);
    if (scrollMode) setHovered(viewIndex);
  }, [scrollMode, viewIndex]);

  // hand focus back once the rail is no longer inert
  useEffect(() => {
    if (viewing) return;
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }, [viewing]);

  const step = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta > 0 ? "next" : "prev");
      setViewIndex((i) => (i + delta + products.length) % products.length);
    },
    [products.length]
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const viewed = products[viewIndex];
  const viewedColour = colourFor(viewed);

  const addToBag = (size: SizeCode) => {
    const id = `${viewed.id}-${viewedColour.id}-${size}`;
    setBag((items) => {
      const existing = items.find((item) => item.id === id);
      if (existing) return items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      return [
        ...items,
        {
          id,
          productId: viewed.id,
          productName: viewed.name,
          price: viewed.price,
          colourName: viewedColour.name,
          colourHex: viewedColour.hex,
          size,
          quantity: 1,
        },
      ];
    });
    setBump((b) => b + 1);
    setToast({
      id: Date.now(),
      message: `Added to bag: ${viewed.name}, ${viewedColour.name}, ${size}`,
      action: { label: "View bag", onClick: () => (setToast(null), setSheet("bag")) },
    });
  };

  const notify = () => {
    setNotified((s) => new Set(s).add(viewed.id));
    setToast({ id: Date.now(), message: `You're on the list for ${viewed.name}. It drops Friday at 12:00.` });
  };

  const clearToast = useCallback(() => setToast(null), []);
  const closeSheet = useCallback(() => setSheet(null), []);

  return (
    <div className={viewing ? "is-viewing" : undefined}>
      <OffTheRailHeader
        viewing={viewing}
        bagCount={bagCount}
        bump={bump}
        onAbout={() => setSheet("about")}
        onContact={() => setSheet("contact")}
        onBag={() => setSheet("bag")}
        onClose={closeView}
      />

      <main className="otr-main">
        <h1 className="sr-only">Off the Rail: this week&apos;s drop</h1>
        <section className="otr-showcase otr-dimmable" inert={viewing} aria-label="Clothing rail">
          <OffTheRailRail
            products={products}
            colourFor={colourFor}
            activeIndex={active}
            scrollMode={scrollMode}
            onActivate={setHovered}
            onOpen={openView}
          />
          <OffTheRailCaption
            product={active === null ? null : products[active]}
            colour={active === null ? null : colourFor(products[active])}
            count={products.length}
            fromPrice={fromPrice}
            hint={scrollMode ? "Swipe the rail" : "Hover to turn"}
            onSeeAvailability={() => openView(active ?? 0)}
          />
        </section>
      </main>

      <ProductView
        open={viewing}
        product={viewed}
        index={viewIndex}
        total={products.length}
        direction={direction}
        colour={viewedColour}
        notified={notified.has(viewed.id)}
        onColour={(c) => setColourIds((ids) => ({ ...ids, [viewed.id]: c.id }))}
        onPrev={prev}
        onNext={next}
        onClose={closeView}
        onAdd={addToBag}
        onNotify={notify}
      />

      <OffTheRailTicker />
      <OffTheRailSheet kind={sheet} bag={bag} onRemove={(id) => setBag((b) => b.filter((i) => i.id !== id))} onClose={closeSheet} />
      <BagToast toast={toast} onDone={clearToast} />
    </div>
  );
}
