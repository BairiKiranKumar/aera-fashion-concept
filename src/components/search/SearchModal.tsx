"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/commerce";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ["Structured Overshirt", "Relaxed Trouser", "Wool Coat", "Ribbed Tank"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search catalogue"
      className="fixed inset-0 z-50 flex flex-col bg-[#F5F2EC] transition-opacity duration-300"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-[#D8D5CF]">
        <span className="font-editorial text-2xl tracking-wider text-[#0A0A0A]">
          AERA
        </span>
        <button
          onClick={onClose}
          type="button"
          aria-label="Close search"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs uppercase tracking-widest text-[#242424] hover:text-[#0A0A0A] transition-colors"
        >
          CLOSE [ESC]
        </button>
      </div>

      {/* Main search container */}
      <div className="flex-1 overflow-y-auto px-6 py-10 md:px-16 md:py-16 max-w-5xl mx-auto w-full">
        <div className="relative mb-12">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH THE COLLECTION..."
            style={{ border: "none", borderBottom: "2px solid #0A0A0A", outline: "none", boxShadow: "none" }}
            className="w-full bg-transparent rounded-none pb-4 font-editorial text-3xl md:text-5xl text-[#0A0A0A] placeholder:text-[#B9B1A6] focus:outline-none focus:ring-0 appearance-none"
          />
        </div>

        {/* Popular searches when query is empty */}
        {!query.trim() && (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#666666] mb-6">
              SUGGESTIONS
            </p>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="min-h-[44px] px-4 py-2 border border-[#D8D5CF] text-xs uppercase tracking-wider text-[#242424] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D8D5CF]">
              <span className="text-[11px] uppercase tracking-widest text-[#666666]">
                {filteredProducts.length} {filteredProducts.length === 1 ? "RESULT" : "RESULTS"}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-editorial text-2xl text-[#242424] mb-2">
                  No matching garments found
                </p>
                <p className="text-xs text-[#666666]">
                  Try searching for trouser, coat, overshirt, or tank.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
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
        )}
      </div>
    </div>
  );
}
