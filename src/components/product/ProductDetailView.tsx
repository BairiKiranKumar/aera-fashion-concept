"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/commerce";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || "M");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Gallery images array
  const galleryImages = [
    product.images.primary,
    product.images.secondary,
    product.images.editorial || product.images.primary,
    product.images.detail || product.images.secondary,
  ];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: product.images.primary,
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full bg-[#F5F2EC] text-[#0A0A0A] pt-24 pb-32 lg:pb-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-widest text-[#666666] flex items-center gap-2">
          <Link href="/shop" className="hover:text-[#0A0A0A]">
            SHOP
          </Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-[#0A0A0A]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#0A0A0A] font-medium">{product.name}</span>
        </nav>

        {/* Main PDP Grid: Left 60-65% Gallery, Right Sticky Purchase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            {/* Desktop Vertical Staggered Gallery */}
            <div className="hidden lg:grid grid-cols-1 gap-6">
              {galleryImages.map((img, idx) => (
                <div
                  key={`${img}-${idx}`}
                  className="relative aspect-[3/4] w-full bg-[#EAE6DF] overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${product.name} editorial view ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#F5F2EC]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-widest text-[#0A0A0A]">
                    STUDY 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div className="lg:hidden relative">
              <div className="relative aspect-[3/4] w-full bg-[#EAE6DF] overflow-hidden">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={`${product.name} view`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile image dots */}
              <div className="flex justify-center gap-2 mt-4">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`h-1.5 transition-all ${
                      activeImageIndex === i
                        ? "w-6 bg-[#0A0A0A]"
                        : "w-2 bg-[#B9B1A6]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Information Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8 pb-16">
            {/* Header info */}
            <div className="border-b border-[#D8D5CF] pb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
                {product.tag || "COLLECTION 01"}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#0A0A0A] mb-3">
                {product.name}
              </h1>
              <p className="font-editorial text-2xl text-[#242424]">
                {product.currency}
                {product.price.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-3">
                <span className="text-[#666666]">COLOR:</span>
                <span className="text-[#0A0A0A] font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`min-h-[44px] min-w-[44px] p-1 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor === c.name
                        ? "border-[#0A0A0A] scale-105"
                        : "border-transparent hover:border-[#D8D5CF]"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full block border border-black/10 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-3">
                <span className="text-[#666666]">SIZE:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#0A0A0A] underline hover:text-[#5A201C] min-h-[44px] flex items-center"
                >
                  SIZE GUIDE
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-h-[44px] flex items-center justify-center text-xs uppercase tracking-wider border transition-colors ${
                      selectedSize === s
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F2EC] font-semibold"
                        : "border-[#D8D5CF] text-[#0A0A0A] hover:border-[#0A0A0A]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Add to Bag Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full min-h-[52px] bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#242424] transition-colors"
              >
                ADD TO BAG
              </button>
            </div>

            {/* Description */}
            <div className="pt-4 text-xs sm:text-sm text-[#242424] font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#D8D5CF] divide-y divide-[#D8D5CF]">
              {/* Details Accordion */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-[#0A0A0A] font-medium text-left min-h-[44px]"
                >
                  <span>GARMENT DETAILS</span>
                  <span>{openAccordion === "details" ? "-" : "+"}</span>
                </button>
                {openAccordion === "details" && (
                  <ul className="pt-3 pb-2 space-y-2 text-xs text-[#666666]">
                    {product.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0A0A0A]">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Material & Care Accordion */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-[#0A0A0A] font-medium text-left min-h-[44px]"
                >
                  <span>MATERIAL & CARE</span>
                  <span>{openAccordion === "care" ? "-" : "+"}</span>
                </button>
                {openAccordion === "care" && (
                  <ul className="pt-3 pb-2 space-y-2 text-xs text-[#666666]">
                    {product.care.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0A0A0A]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Shipping & Returns Accordion */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-[#0A0A0A] font-medium text-left min-h-[44px]"
                >
                  <span>SHIPPING & RETURNS</span>
                  <span>{openAccordion === "shipping" ? "-" : "+"}</span>
                </button>
                {openAccordion === "shipping" && (
                  <div className="pt-3 pb-2 space-y-2 text-xs text-[#666666] leading-relaxed">
                    <p>Complimentary express delivery across India on all orders.</p>
                    <p>International orders dispatched via carbon-neutral courier.</p>
                    <p>14-day return window in original condition with intact seals.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#D8D5CF]">
            <div className="flex justify-between items-end mb-10 pb-4 border-b border-[#D8D5CF]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-2">
                  CURATED SELECTION
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#0A0A0A]">
                  Complete the Wardrobe
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A] border-b border-[#0A0A0A] pb-0.5"
              >
                VIEW ALL
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Persistent Bottom Purchase Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F5F2EC]/95 backdrop-blur-md border-t border-[#D8D5CF] p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#666666] block">
              {product.name}
            </span>
            <span className="font-editorial text-lg text-[#0A0A0A]">
              {product.currency}
              {product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-[44px] px-6 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest font-medium hover:bg-[#242424] transition-colors"
          >
            ADD TO BAG
          </button>
        </div>

        {/* Size Guide Modal */}
        {isSizeGuideOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          >
            <div className="bg-[#F5F2EC] max-w-lg w-full p-8 border border-[#D8D5CF] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#D8D5CF] pb-4">
                <h3 className="font-editorial text-2xl uppercase tracking-wider text-[#0A0A0A]">
                  SIZE MEASUREMENTS (CM)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs uppercase tracking-widest text-[#666666] hover:text-[#0A0A0A]"
                >
                  CLOSE
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#D8D5CF] text-[#666666] uppercase tracking-wider">
                      <th className="py-2">SIZE</th>
                      <th className="py-2">CHEST</th>
                      <th className="py-2">WAIST</th>
                      <th className="py-2">LENGTH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8D5CF]/50 text-[#0A0A0A]">
                    <tr>
                      <td className="py-2 font-medium">XS</td>
                      <td className="py-2">92</td>
                      <td className="py-2">74</td>
                      <td className="py-2">71</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">S</td>
                      <td className="py-2">98</td>
                      <td className="py-2">80</td>
                      <td className="py-2">73</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">M</td>
                      <td className="py-2">104</td>
                      <td className="py-2">86</td>
                      <td className="py-2">75</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">L</td>
                      <td className="py-2">110</td>
                      <td className="py-2">92</td>
                      <td className="py-2">77</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">XL</td>
                      <td className="py-2">116</td>
                      <td className="py-2">98</td>
                      <td className="py-2">79</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-[#666666] leading-relaxed">
                Garments cut with relaxed architectural ease. Choose your true size for the intended drape, or size down for a closer contour.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
