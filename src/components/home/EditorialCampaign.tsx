import React from "react";
import Image from "next/image";
import Link from "next/link";

export function EditorialCampaign() {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#0A0A0A] text-[#F5F2EC] flex items-center overflow-hidden my-0">
      {/* Full-width campaign photograph */}
      <div className="absolute inset-0 select-none">
        <Image
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=90"
          alt="AERA Campaign 01: Form Follows Movement"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.78] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-24 flex flex-col justify-between h-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8D5CF]">
              AERA / CAMPAIGN 01
            </span>
            <span className="w-6 h-[1px] bg-[#B9B1A6]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B9B1A6]">
              SERIES 01
            </span>
          </div>

          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight uppercase mb-8">
            FORM
            <span className="block italic font-normal text-[#D8D5CF]">
              FOLLOWS
            </span>
            MOVEMENT
          </h2>

          <p className="text-sm md:text-base text-[#D8D5CF] font-light max-w-md mb-8 leading-relaxed">
            Garments sculpted to respond to the natural stride. Virgin wool blends, organic poplin, and structured silhouettes designed without stiffness.
          </p>

          <Link
            href="/journal/movement-studies"
            className="inline-flex items-center min-h-[48px] px-8 py-3.5 bg-[#F5F2EC] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors"
          >
            VIEW THE CAMPAIGN
          </Link>
        </div>
      </div>
    </section>
  );
}
