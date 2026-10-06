"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/commerce";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="border-b border-[#D8D5CF] pb-8 mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
              CATALOGUE SEARCH
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-[#0A0A0A] mb-6">
              Search the Collection
            </h1>
            <div className="relative max-w-2xl">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="TYPE TO FILTER (E.G. OVERSHIRT, TROUSER, COAT)..."
                className="w-full bg-transparent border-b-2 border-[#0A0A0A] pb-3 text-lg sm:text-2xl font-editorial text-[#0A0A0A] placeholder:text-[#B9B1A6] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-8 pb-3 border-b border-[#D8D5CF]">
              <span className="text-[11px] uppercase tracking-widest text-[#666666]">
                SHOWING {filteredProducts.length} {filteredProducts.length === 1 ? "PIECE" : "PIECES"}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-editorial text-2xl text-[#0A0A0A] mb-2">
                  No matching garments found
                </p>
                <p className="text-xs uppercase tracking-wider text-[#666666]">
                  Please try a different search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-[#EAE6DF] overflow-hidden mb-3">
                      <Image
                        src={product.images.primary}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xs font-medium text-[#0A0A0A] uppercase tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#666666] mt-1">
                      {product.currency}
                      {product.price.toLocaleString("en-IN")}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
