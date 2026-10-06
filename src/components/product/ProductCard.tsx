"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/commerce";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      color: selectedColor,
      size: product.sizes[1] || product.sizes[0] || "M",
      quantity: 1,
      image: product.images.primary,
    });
  };

  return (
    <article className="group relative flex flex-col">
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-[3/4] w-full bg-[#EAE6DF] overflow-hidden block"
      >
        {/* Primary Image */}
        <Image
          src={product.images.primary}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Secondary Image for Hover */}
        <Image
          src={product.images.secondary}
          alt={`${product.name} alternate view`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />

        {/* Category or Tag Badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#F5F2EC]/90 backdrop-blur-xs px-2 py-1 text-[9px] uppercase tracking-widest text-[#0A0A0A]">
            {product.tag}
          </span>
        )}

        {/* Desktop Quick Add Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
          <button
            onClick={handleQuickAdd}
            type="button"
            className="w-full min-h-[40px] bg-[#0A0A0A]/90 hover:bg-[#0A0A0A] text-[#F5F2EC] text-[10px] uppercase tracking-widest font-medium transition-colors flex items-center justify-center backdrop-blur-xs"
          >
            QUICK ADD
          </button>
        </div>
      </Link>

      {/* Product Metadata */}
      <div className="pt-3 pb-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="text-xs uppercase font-medium tracking-wider text-[#0A0A0A] hover:text-[#5A201C] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="text-xs font-normal text-[#242424] shrink-0">
            {product.currency}
            {product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Color Indicators & Mobile Touch Button */}
        <div className="flex items-center justify-between mt-2">
          {/* Swatches */}
          <div className="flex items-center space-x-1.5" aria-label="Available colors">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(c.name);
                }}
                title={c.name}
                className={`w-3 h-3 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? "border-[#0A0A0A] scale-110"
                    : "border-transparent hover:border-[#B9B1A6]"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          <span className="text-[10px] uppercase tracking-wider text-[#666666]">
            {product.colors.length} {product.colors.length === 1 ? "COLOR" : "COLORS"}
          </span>
        </div>
      </div>
    </article>
  );
}
