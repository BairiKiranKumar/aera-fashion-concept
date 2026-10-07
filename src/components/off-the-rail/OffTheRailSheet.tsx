"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import type { BagItem } from "@/types/off-the-rail";

export type SheetKind = "about" | "contact" | "bag";

interface OffTheRailSheetProps {
  kind: SheetKind | null;
  bag: BagItem[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const FREE_DELIVERY = 60;

export function OffTheRailSheet({ kind, bag, onRemove, onClose }: OffTheRailSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kind) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    // capture so Escape closes the sheet before the product view sees it
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      previous?.focus?.();
    };
  }, [kind, onClose]);

  if (!kind) return null;

  const subtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const toFree = Math.max(0, FREE_DELIVERY - subtotal);
  const title = kind === "about" ? "About" : kind === "contact" ? "Contact" : "Bag";

  return (
    <>
      <div className="otr-sheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="otr-sheet" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <div className="flex items-center justify-between mb-8">
          <span className="otr-ui text-[12px] font-semibold text-[var(--otr-muted)]">{title}</span>
          <button type="button" className="otr-navlink otr-ui" onClick={onClose}>
            Close <span className="otr-close__x" aria-hidden="true" />
          </button>
        </div>

        {kind === "about" && (
          <div className="space-y-4 text-[15px] leading-relaxed text-[var(--otr-muted)]">
            <p className="font-[family-name:var(--otr-font-logo)] text-[44px] leading-[0.8] text-[var(--otr-ink)] mb-6">
              Off the
              <br />
              <span className="pl-6">Rail</span>
            </p>
            <p className="otr-title text-[20px] leading-snug text-[var(--otr-ink)]">
              Small-batch art-led tees and shirts from London. A new drop every Friday.
            </p>
            <p>
              Each design starts as a painting, a drawing or a print made in the studio, then goes onto heavyweight cotton in runs of
              a few dozen. When a run sells through, it comes off the rail for good.
            </p>
            <p>Everything is printed and stitched in London.</p>
            <Link href="/" className="otr-ui inline-block pt-4 text-[12px] font-semibold text-[var(--otr-ink)] underline underline-offset-4">
              Back to AERA
            </Link>
          </div>
        )}

        {kind === "contact" && (
          <dl className="space-y-6 text-[15px] leading-relaxed">
            <div>
              <dt className="otr-ui text-[11px] font-semibold text-[var(--otr-muted)] mb-1">Orders and returns</dt>
              <dd className="text-[var(--otr-ink)]">studio@offtherail.london</dd>
            </div>
            <div>
              <dt className="otr-ui text-[11px] font-semibold text-[var(--otr-muted)] mb-1">Wholesale and press</dt>
              <dd className="text-[var(--otr-ink)]">press@offtherail.london</dd>
            </div>
            <div>
              <dt className="otr-ui text-[11px] font-semibold text-[var(--otr-muted)] mb-1">Drops</dt>
              <dd className="text-[var(--otr-ink)]">Fridays at 12:00, London time</dd>
            </div>
          </dl>
        )}

        {kind === "bag" && (
          <div className="flex flex-col flex-1">
            {bag.length === 0 ? (
              <p className="text-[15px] text-[var(--otr-muted)] py-10">
                Nothing in your bag yet. Hover a garment on the rail to turn it round.
              </p>
            ) : (
              <>
                <p className="otr-ui text-[11px] font-semibold text-[var(--otr-muted)] mb-2">
                  {toFree > 0 ? `£${toFree} away from free UK delivery` : "Free UK delivery unlocked"}
                </p>
                <div className="h-[3px] rounded-full bg-[var(--otr-line)] mb-6 overflow-hidden">
                  <div
                    className="h-full bg-[var(--otr-ink)] transition-[width] duration-700"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY) * 100)}%` }}
                  />
                </div>
                <ul className="divide-y divide-[var(--otr-line)]">
                  {bag.map((item) => (
                    <li key={item.id} className="py-4 flex items-center gap-4">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-[inset_0_0_0_1px_rgba(43,51,96,0.25)]"
                        style={{ background: item.colourHex }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="otr-title text-[17px] text-[var(--otr-ink)]">{item.productName}</p>
                        <p className="otr-ui text-[11px] text-[var(--otr-muted)] mt-1">
                          {item.colourName} · {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-[14px] font-semibold tabular-nums">£{item.price * item.quantity}</span>
                      <button
                        type="button"
                        className="otr-ui text-[11px] text-[var(--otr-muted)] hover:text-[var(--otr-ink)] min-h-[44px] px-1"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.productName}, ${item.size}`}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-[var(--otr-line)] flex justify-between items-baseline">
                  <span className="otr-ui text-[12px] font-semibold text-[var(--otr-muted)]">Subtotal</span>
                  <span className="text-[20px] font-semibold tabular-nums">£{subtotal}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
