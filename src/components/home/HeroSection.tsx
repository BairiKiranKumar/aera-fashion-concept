"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#0A0A0A] text-[#F5F2EC] flex items-center justify-center">
      {/* Background Campaign Imagery */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=2200&q=90"
          alt="AERA SS26 Fashion Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] brightness-[0.86] contrast-[1.04] scale-100 transition-transform duration-1000 ease-out will-change-transform"
        />
        {/* Subtle cinematic gradient to preserve navbar and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-black/20 to-[#0A0A0A]/85 pointer-events-none" />
      </div>

      {/* Editorial Typography Art Direction */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none select-none px-4">
        <div className="text-center font-editorial tracking-tight text-[#F5F2EC] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          <span className="block text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[9.5vw] leading-[0.85] uppercase">
            THE
          </span>
          <span className="block text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[9.5vw] leading-[0.85] uppercase italic font-light tracking-wide text-[#EAE6DF]">
            NEW
          </span>
          <span className="block text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[9.5vw] leading-[0.85] uppercase">
            FORM
          </span>
        </div>
      </div>

      {/* Micro-copy & CTA Overlays */}
      <div className="relative z-20 w-full max-w-[1440px] h-full mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16 pointer-events-none">
        {/* Top spacer for navbar */}
        <div />

        {/* Bottom Hero Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-4">
          <div className="space-y-1">
            <span className="block text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#D8D5CF]">
              COLLECTION 01
            </span>
            <span className="block text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#B9B1A6]">
              SPRING / SUMMER 2026
            </span>
          </div>

          <div className="pointer-events-auto">
            <Link
              href="#collection-intro"
              className="inline-flex items-center min-h-[48px] px-8 py-3.5 bg-[#F5F2EC] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:tracking-[0.25em] transition-all duration-300"
            >
              DISCOVER THE COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
