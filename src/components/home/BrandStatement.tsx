import React from "react";
import Link from "next/link";

export function BrandStatement() {
  return (
    <section className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-28 md:py-44 px-6 md:px-12 border-b border-[#D8D5CF]/60 text-center flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#666666] block mb-8">
          PHILOSOPHY
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-[#0A0A0A] mb-8">
          Wear less.
          <span className="block italic text-[#242424] font-normal">
            Choose better.
          </span>
        </h2>

        <p className="text-sm md:text-base text-[#242424] font-light max-w-xl mx-auto mb-10 leading-relaxed">
          A study in proportion, texture, and everyday movement. We reject rapid seasonal obsolescence in favor of modular silhouettes made to last.
        </p>

        <Link
          href="/journal"
          className="inline-flex items-center min-h-[44px] text-xs uppercase tracking-[0.2em] text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#5A201C] hover:border-[#5A201C] transition-colors"
        >
          READ OUR JOURNAL
        </Link>
      </div>
    </section>
  );
}
