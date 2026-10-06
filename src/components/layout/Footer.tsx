"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const [subscribed, setSubscribed] = React.useState(false);
  const [activeNotice, setActiveNotice] = React.useState<string | null>(null);

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F2EC] pt-20 md:pt-32 pb-12 px-6 md:px-12 mt-auto">
      {/* Client Service Notice Toast/Modal */}
      {activeNotice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-[#F5F2EC] text-[#0A0A0A] p-8 max-w-md w-full border border-[#D8D5CF] shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              CLIENT SERVICES
            </span>
            <h3 className="font-editorial text-2xl mb-4">{activeNotice}</h3>
            <p className="text-xs text-[#242424] leading-relaxed mb-6 font-light">
              All orders are packaged in recycled, unbleached fiber sleeves. Carbon-neutral complimentary courier dispatch on all domestic orders. 30-day effortless returns.
            </p>
            <button
              type="button"
              onClick={() => setActiveNotice(null)}
              className="w-full py-3 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest hover:bg-[#242424] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto">
        {/* Massive Brand Typographic Headline */}
        <div className="border-b border-[#242424] pb-12 md:pb-20 mb-16 md:mb-20">
          <span className="font-editorial text-[22vw] sm:text-[18vw] leading-[0.8] block tracking-[0.05em] text-[#F5F2EC] select-none text-center sm:text-left">
            AERA
          </span>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-24">
          {/* Column 1: Navigation */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B9B1A6] block mb-6">
              COLLECTIONS
            </span>
            <ul className="space-y-3">
              {["Shop All", "New Arrivals", "Women", "Men", "Essentials", "Journal"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === "Shop All"
                          ? "/shop"
                          : item === "New Arrivals"
                          ? "/shop?filter=new"
                          : item === "Women"
                          ? "/shop/women"
                          : item === "Men"
                          ? "/shop/men"
                          : item === "Essentials"
                          ? "/shop?category=essentials"
                          : "/journal"
                      }
                      className="text-xs uppercase tracking-wider text-[#D8D5CF] hover:text-[#F5F2EC] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2: Client Support */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B9B1A6] block mb-6">
              CLIENT SERVICES
            </span>
            <ul className="space-y-3">
              {[
                { name: "Shipping & Duties" },
                { name: "Returns & Exchanges" },
                { name: "Garment Care" },
                { name: "Size Guide" },
                { name: "Contact Studio" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => setActiveNotice(link.name)}
                    className="text-xs uppercase tracking-wider text-[#D8D5CF] hover:text-[#F5F2EC] transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brand Philosophy */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B9B1A6] block mb-6">
              STUDIO
            </span>
            <div className="space-y-3 text-xs text-[#B9B1A6] leading-relaxed">
              <p>SS26 Movement Studies.</p>
              <p>Designed for movement. Made for everything after.</p>
              <p className="pt-2 text-[10px] uppercase tracking-widest text-[#D8D5CF]">
                PORTFOLIO SPECIFICATION PROJECT
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter Micro-signup */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B9B1A6] block mb-6">
              THE AERA EDIT
            </span>
            <p className="text-xs text-[#B9B1A6] mb-4">
              Seasonal releases, movement studies, and selected pieces.
            </p>
            {subscribed ? (
              <p className="text-[11px] uppercase tracking-widest text-[#D8D5CF] py-2 border-b border-[#242424]">
                RECEIVED / THANK YOU
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="YOUR EMAIL"
                  className="bg-transparent border-b border-[#D8D5CF] py-2 text-xs text-[#F5F2EC] placeholder:text-[#666666] focus:outline-none focus:border-[#F5F2EC] rounded-none"
                />
                <button
                  type="submit"
                  className="min-h-[44px] self-start text-[11px] uppercase tracking-[0.2em] text-[#F5F2EC] hover:text-[#B9B1A6] transition-colors pt-1"
                >
                  JOIN THE EDIT
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-[#242424] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] uppercase tracking-widest text-[#666666]">
          <span>© 2026 AERA APPAREL. ALL RIGHTS RESERVED.</span>
          <span>
            CONCEPT & FRONTEND CRAFT BY{" "}
            <span className="text-[#F5F2EC]">@kiranbuildswithai</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
