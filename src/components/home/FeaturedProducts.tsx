import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/commerce/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-16 md:py-24 px-6 md:px-12 border-b border-[#D8D5CF]/60">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 pb-4 border-b border-[#D8D5CF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              FEATURED ESSENTIALS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#0A0A0A]">
              Selected Pieces
            </h2>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A] hover:text-[#5A201C] transition-colors border-b border-[#0A0A0A] pb-0.5"
            >
              EXPLORE ALL (06)
            </Link>
          </div>
        </div>

        {/* 4-Column Desktop / 2-Column Mobile Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
