"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function CollectionIntro() {
  return (
    <section
      id="collection-intro"
      className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-20 md:py-32 lg:py-40 px-6 md:px-12 border-b border-[#D8D5CF]/60"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Subheader */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#666666]">
            SS26
          </span>
          <span className="w-8 h-[1px] bg-[#B9B1A6]" />
          <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#666666]">
            COLLECTION 01
          </span>
        </div>

        {/* Asymmetrical Grid: Large Editorial Statement + Negative Space + Photographic Fragment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Large Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-[#0A0A0A]">
              Designed for movement.
              <span className="block italic text-[#242424] font-normal">
                Made for everything after.
              </span>
            </h2>

            <div className="pt-4 max-w-xl space-y-6 text-sm md:text-base text-[#242424] leading-relaxed font-light">
              <p>
                A study in proportion, texture, and everyday movement. We construct quiet essentials with architectural clarity and unhurried craftsmanship.
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#666666]">
                CUT IN SMALL BATCHES. CRAFTED FOR DURABILITY.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center min-h-[44px] text-xs uppercase tracking-[0.2em] text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#5A201C] hover:border-[#5A201C] transition-colors"
              >
                VIEW THE ESSENTIALS
              </Link>
            </div>
          </div>

          {/* Asymmetric Photographic Accent */}
          <div className="lg:col-span-5 lg:pt-12">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85"
                alt="AERA SS26 Silhouette Study"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-[#F5F2EC]/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#0A0A0A]">
                STUDY 01 / TEXTURE & DRAPE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
