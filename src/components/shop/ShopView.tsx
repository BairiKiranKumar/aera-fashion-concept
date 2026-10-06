"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/commerce";
import { ProductCard } from "@/components/product/ProductCard";

interface ShopViewProps {
  initialProducts: Product[];
  title: string;
  subtitle: string;
  categoryFilter?: string;
}

export function ShopView({
  initialProducts,
  title,
  subtitle,
  categoryFilter,
}: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryFilter || "all"
  );
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [viewColumns, setViewColumns] = useState<3 | 4>(4);

  // Extract unique filter options
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Stone", "Chalk", "Charcoal", "Black", "Off White", "Blue"];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedSize !== "all") {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (selectedColor !== "all") {
      result = result.filter((p) =>
        p.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }

    return result;
  }, [initialProducts, selectedCategory, selectedSize, selectedColor, sortBy]);

  const hasActiveFilters =
    (selectedCategory !== "all" && !categoryFilter) ||
    selectedSize !== "all" ||
    selectedColor !== "all";

  const clearFilters = () => {
    if (!categoryFilter) setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedColor("all");
  };

  return (
    <div className="w-full bg-[#F5F2EC] min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Collection Header */}
        <div className="mb-12 border-b border-[#D8D5CF] pb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
            COLLECTION 01
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#0A0A0A] mb-3">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#242424] font-light max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-10 border-b border-[#D8D5CF] text-xs">
          {/* Left: Filter Toggle & Active count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterSheetOpen(!isFilterSheetOpen)}
              type="button"
              className="min-h-[44px] flex items-center gap-2 uppercase tracking-widest font-medium text-[#0A0A0A] hover:text-[#5A201C]"
            >
              <span>FILTERS</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#5A201C]" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                type="button"
                className="text-[11px] uppercase tracking-wider text-[#666666] underline hover:text-[#0A0A0A]"
              >
                RESET
              </button>
            )}

            <span className="text-[11px] uppercase tracking-wider text-[#666666] hidden sm:inline-block">
              SHOWING {filteredProducts.length} PIECES
            </span>
          </div>

          {/* Right: Sort & Grid View Switcher */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-[11px] uppercase tracking-wider text-[#666666]">
                SORT:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs uppercase tracking-wider font-medium text-[#0A0A0A] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Desktop column toggle */}
            <div className="hidden lg:flex items-center gap-2 border-l border-[#D8D5CF] pl-4">
              <button
                onClick={() => setViewColumns(3)}
                type="button"
                className={`text-[11px] uppercase tracking-wider ${
                  viewColumns === 3 ? "text-[#0A0A0A] font-bold" : "text-[#666666]"
                }`}
              >
                3 COL
              </button>
              <span>/</span>
              <button
                onClick={() => setViewColumns(4)}
                type="button"
                className={`text-[11px] uppercase tracking-wider ${
                  viewColumns === 4 ? "text-[#0A0A0A] font-bold" : "text-[#666666]"
                }`}
              >
                4 COL
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Expandable Filter Bar */}
        {isFilterSheetOpen && (
          <div className="bg-[#EAE6DF]/70 border border-[#D8D5CF] p-6 mb-10 transition-all">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {/* Category */}
              {!categoryFilter && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-[#666666] mb-3">
                    CATEGORY
                  </h4>
                  <div className="flex flex-col gap-2">
                    {["all", "women", "men", "essentials"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-xs uppercase tracking-wider ${
                          selectedCategory === cat
                            ? "font-semibold text-[#0A0A0A]"
                            : "text-[#666666] hover:text-[#0A0A0A]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-[#666666] mb-3">
                  SIZE
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize("all")}
                    className={`min-h-[36px] px-3 border text-xs uppercase ${
                      selectedSize === "all"
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F2EC]"
                        : "border-[#D8D5CF] text-[#0A0A0A]"
                    }`}
                  >
                    ALL
                  </button>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-h-[36px] px-3 border text-xs uppercase ${
                        selectedSize === s
                          ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F2EC]"
                          : "border-[#D8D5CF] text-[#0A0A0A]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-[#666666] mb-3">
                  COLOR
                </h4>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedColor("all")}
                    className={`text-left text-xs uppercase tracking-wider ${
                      selectedColor === "all"
                        ? "font-semibold text-[#0A0A0A]"
                        : "text-[#666666] hover:text-[#0A0A0A]"
                    }`}
                  >
                    ALL COLORS
                  </button>
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`text-left text-xs uppercase tracking-wider ${
                        selectedColor === c
                          ? "font-semibold text-[#0A0A0A]"
                          : "text-[#666666] hover:text-[#0A0A0A]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-editorial text-3xl text-[#0A0A0A] mb-3">
              No pieces match your selection
            </p>
            <p className="text-xs uppercase tracking-widest text-[#666666] mb-6">
              Try adjusting your size or color criteria.
            </p>
            <button
              onClick={clearFilters}
              type="button"
              className="min-h-[44px] px-6 py-2.5 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 ${
              viewColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } gap-x-4 md:gap-x-6 gap-y-12`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
