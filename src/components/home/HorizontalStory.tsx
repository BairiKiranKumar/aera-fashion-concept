"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function HorizontalStory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      num: "01",
      title: "MATERIAL",
      copy: "Organic long-staple cotton and recycled virgin wool. Tactile textures chosen for longevity and authentic patina.",
      image:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      num: "02",
      title: "FORM",
      copy: "Proportions calibrated around human posture. Dropped shoulder contours and unconstructed chest structures.",
      image:
        "https://images.unsplash.com/photo-1765114459508-2666016760af?auto=format&fit=crop&w=1200&q=85",
    },
    {
      num: "03",
      title: "MOVEMENT",
      copy: "Garments designed to live in continuous motion. Clean lines that maintain composure through every stride.",
      image:
        "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-20 md:py-32 px-6 md:px-12 border-b border-[#D8D5CF]/60">
      <div className="max-w-[1440px] mx-auto">
        {/* Header with scroll controls */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-[#D8D5CF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A]">
              Movement Studies
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              type="button"
              aria-label="Scroll stories backward"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#D8D5CF] text-xs hover:border-[#0A0A0A] hover:bg-[#EAE6DF] transition-colors"
            >
              PREV
            </button>
            <button
              onClick={() => handleScroll("right")}
              type="button"
              aria-label="Scroll stories forward"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#D8D5CF] text-xs hover:border-[#0A0A0A] hover:bg-[#EAE6DF] transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
          tabIndex={0}
          aria-label="Horizontal editorial story gallery"
        >
          {stories.map((story) => (
            <div
              key={story.num}
              className="shrink-0 w-[85vw] sm:w-[480px] lg:w-[540px] snap-start flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-[#EAE6DF] overflow-hidden mb-6">
                <Image
                  src={story.image}
                  alt={`AERA ${story.title} Study`}
                  fill
                  sizes="(max-width: 768px) 85vw, 540px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#F5F2EC]/90 backdrop-blur-xs px-3 py-1 text-xs font-mono tracking-widest text-[#0A0A0A]">
                  {story.num}
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl uppercase tracking-wider text-[#0A0A0A] mb-2">
                {story.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#242424] font-light leading-relaxed max-w-md">
                {story.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
