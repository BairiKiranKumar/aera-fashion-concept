import React from "react";
import Image from "next/image";
import Link from "next/link";

export function CategoryBlocks() {
  const categories = [
    {
      title: "WOMEN",
      subtitle: "Sculpted tailoring and fluid draping",
      href: "/shop/women",
      image:
        "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1200&q=85",
      count: "04 PIECES",
      span: "lg:col-span-5",
    },
    {
      title: "MEN",
      subtitle: "Structured outerwear and clean stride lines",
      href: "/shop/men",
      image:
        "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=1200&q=85",
      count: "03 PIECES",
      span: "lg:col-span-4",
    },
    {
      title: "ESSENTIALS",
      subtitle: "Micro-rib knits and permanent foundations",
      href: "/shop?category=essentials",
      image:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
      count: "03 PIECES",
      span: "lg:col-span-3",
    },
  ];

  return (
    <section className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-20 md:py-32 px-6 md:px-12 border-b border-[#D8D5CF]/60">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12 pb-4 border-b border-[#D8D5CF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              CATEGORIES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A]">
              Shop by Wardrobe
            </h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#666666] hidden sm:block">
            SS26 MODULAR ARCHITECTURE
          </span>
        </div>

        {/* Asymmetrical desktop grid / vertical mobile stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden bg-[#EAE6DF] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-end p-8 md:p-10 ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={`AERA ${cat.title} Collection`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-[#0A0A0A]/20 to-transparent" />

              <div className="relative z-10 text-[#F5F2EC]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8D5CF] block mb-2">
                  {cat.count}
                </span>
                <h3 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#D8D5CF] max-w-xs mb-4 font-light">
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium border-b border-[#F5F2EC] pb-1 group-hover:text-white transition-colors">
                  DISCOVER {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
