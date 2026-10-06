import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "The Journal | AERA",
  description:
    "Editorial essays, movement studies, and garment notes from the AERA design studio.",
};

export default function JournalIndexPage() {
  const articles = [
    {
      slug: "movement-studies",
      title: "Movement Studies: SS26 Campaign",
      category: "CAMPAIGN 01",
      date: "SPRING 2026",
      summary:
        "A photographic investigation into proportion, drape, and the natural stride. Photographed in warm architectural daylight.",
      image:
        "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1600&q=90",
      featured: true,
    },
    {
      slug: "the-architecture-of-proportion",
      title: "The Architecture of Proportion",
      category: "STUDIO ESSAY",
      date: "SPRING 2026",
      summary:
        "Why we reject rigid tailoring in favor of dropped shoulder lines and unconstructed chest balances.",
      image:
        "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1200&q=85",
      featured: false,
    },
    {
      slug: "tactile-longevity",
      title: "Tactile Longevity & Natural Patina",
      category: "MATERIAL FOCUS",
      date: "SS26",
      summary:
        "Investigating double-faced felted wool, dense Supima micro-rib, and organic poplin.",
      image:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1 pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="border-b border-[#D8D5CF] pb-10 mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              PUBLICATIONS & ESSAYS
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] mb-3">
              The AERA Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#242424] font-light max-w-xl">
              Notes on silhouettes, architectural movement, and material selections from our studio.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-20">
            <Link
              href={`/journal/${articles[0].slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 relative aspect-[16/10] bg-[#EAE6DF] overflow-hidden">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#666666]">
                  {articles[0].category} / {articles[0].date}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] group-hover:text-[#5A201C] transition-colors leading-tight">
                  {articles[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#242424] font-light leading-relaxed">
                  {articles[0].summary}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-medium border-b border-[#0A0A0A] pb-0.5">
                    READ STORY & SHOP THE LOOK
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-12 border-t border-[#D8D5CF]">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/journal/movement-studies`}
                className="group block space-y-4"
              >
                <div className="relative aspect-[4/3] bg-[#EAE6DF] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#666666]">
                    {article.category}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#0A0A0A] group-hover:text-[#5A201C] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#242424] font-light leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
