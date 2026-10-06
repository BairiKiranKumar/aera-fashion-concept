import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/commerce/products";

export async function NewArrivals() {
  const newProducts = await getProducts({ newArrival: true });

  return (
    <section className="w-full bg-[#F5F2EC] text-[#0A0A0A] py-20 md:py-32 px-6 md:px-12 border-b border-[#D8D5CF]/60">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#D8D5CF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              SS26 ADDITIONS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A]">
              New Arrivals
            </h2>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              href="/shop?filter=new"
              className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A] hover:text-[#5A201C] transition-colors border-b border-[#0A0A0A] pb-0.5"
            >
              VIEW ALL NEW ({newProducts.length})
            </Link>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
