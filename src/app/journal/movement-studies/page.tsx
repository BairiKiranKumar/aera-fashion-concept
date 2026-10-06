import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/commerce/products";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata = {
  title: "Movement Studies | Campaign 01 | AERA",
  description:
    "A photographic study in proportion, texture, and everyday movement. Shop the complete looks from SS26 Campaign 01.",
};

export default async function MovementStudiesPage() {
  const overshirt = await getProductBySlug("aera-structured-overshirt");
  const trouser = await getProductBySlug("aera-relaxed-trouser");
  const coat = await getProductBySlug("aera-essential-coat");
  const tank = await getProductBySlug("aera-ribbed-tank");

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1 pt-28 pb-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Editorial Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-3">
              CAMPAIGN 01 / EDITORIAL STUDY
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-8xl text-[#0A0A0A] leading-tight mb-6">
              Movement Studies
            </h1>
            <p className="text-sm md:text-base text-[#242424] font-light leading-relaxed">
              Every garment begins with observation: how cloth breaks across the knee during motion, the ease of an unconstructed shoulder, and the quiet dignity of honest materials.
            </p>
          </div>

          {/* Look 01: Hero Campaign Image + Shop The Look Cards */}
          <div className="space-y-12 mb-32">
            <div className="relative aspect-[16/9] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=2200&q=90"
                alt="AERA Look 01 Movement Study"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute top-6 left-6 bg-[#F5F2EC]/90 backdrop-blur-xs px-3 py-1.5 text-xs uppercase tracking-widest text-[#0A0A0A]">
                LOOK 01 / THE ARCHITECTURAL STRIDE
              </div>
            </div>

            {/* Shop The Look Shelf for Look 01 */}
            <div>
              <div className="flex justify-between items-end mb-8 pb-3 border-b border-[#D8D5CF]">
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#0A0A0A]">
                  Shop the Look
                </h2>
                <span className="text-xs uppercase tracking-widest text-[#666666]">
                  FEATURING 02 PIECES
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {overshirt && <ProductCard product={overshirt} />}
                {trouser && <ProductCard product={trouser} />}
              </div>
            </div>
          </div>

          {/* Look 02: Full-length coat study */}
          <div className="space-y-12">
            <div className="relative aspect-[16/9] w-full bg-[#EAE6DF] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=2200&q=90"
                alt="AERA Look 02 Movement Study"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute top-6 left-6 bg-[#F5F2EC]/90 backdrop-blur-xs px-3 py-1.5 text-xs uppercase tracking-widest text-[#0A0A0A]">
                LOOK 02 / VIRGIN WOOL TAILORING
              </div>
            </div>

            {/* Shop The Look Shelf for Look 02 */}
            <div>
              <div className="flex justify-between items-end mb-8 pb-3 border-b border-[#D8D5CF]">
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#0A0A0A]">
                  Shop the Look
                </h2>
                <span className="text-xs uppercase tracking-widest text-[#666666]">
                  FEATURING 02 PIECES
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {coat && <ProductCard product={coat} />}
                {tank && <ProductCard product={tank} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
