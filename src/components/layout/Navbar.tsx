"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SearchModal } from "@/components/search/SearchModal";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar({ variant = "floating" }: { variant?: "floating" | "solid" }) {
  const { openCart, totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = variant === "solid" || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isSolid
            ? "bg-[#F5F2EC]/95 backdrop-blur-md border-b border-[#D8D5CF] py-4 text-[#0A0A0A]"
            : "bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/10 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              type="button"
              aria-label="Open navigation menu"
              className="min-h-[44px] min-w-[44px] flex items-center text-xs uppercase tracking-widest font-medium"
            >
              MENU
            </button>
          </div>

          {/* Left/Center Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              SHOP
            </Link>
            <Link
              href="/shop?filter=new"
              className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              NEW
            </Link>
            <Link
              href="/shop/women"
              className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              WOMEN
            </Link>
            <Link
              href="/shop/men"
              className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              MEN
            </Link>
            <Link
              href="/journal"
              className="text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              JOURNAL
            </Link>
          </nav>

          {/* Center Brand Wordmark */}
          <div className="text-center">
            <Link
              href="/"
              className="font-editorial text-3xl md:text-4xl tracking-[0.2em] font-normal transition-opacity hover:opacity-80"
              aria-label="AERA Homepage"
            >
              AERA
            </Link>
          </div>

          {/* Right utility navigation */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              type="button"
              className="min-h-[44px] text-xs uppercase tracking-widest hover:opacity-70 transition-opacity hidden sm:inline-block"
            >
              SEARCH
            </button>
            <button
              type="button"
              onClick={() => alert("Customer account: order status and saved addresses.")}
              className="min-h-[44px] text-xs uppercase tracking-widest hover:opacity-70 transition-opacity hidden sm:inline-block"
            >
              ACCOUNT
            </button>
            <button
              onClick={openCart}
              type="button"
              aria-label={`Open shopping bag, ${totalItems} items`}
              className="min-h-[44px] flex items-center text-xs uppercase tracking-widest font-medium hover:opacity-70 transition-opacity"
            >
              BAG ({totalItems})
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
