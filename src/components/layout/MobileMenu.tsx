"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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

  const navLinks = [
    { label: "SHOP ALL", href: "/shop" },
    { label: "NEW ARRIVALS", href: "/shop?filter=new" },
    { label: "WOMEN", href: "/shop/women" },
    { label: "MEN", href: "/shop/men" },
    { label: "ESSENTIALS", href: "/shop?category=essentials" },
    { label: "JOURNAL", href: "/journal" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 bg-[#F5F2EC] flex flex-col justify-between p-6 sm:p-10 transition-opacity duration-300"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8D5CF] pb-6">
        <Link
          href="/"
          onClick={onClose}
          className="font-editorial text-3xl tracking-wider text-[#0A0A0A]"
        >
          AERA
        </Link>
        <button
          onClick={onClose}
          type="button"
          aria-label="Close menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs uppercase tracking-widest text-[#242424] hover:text-[#0A0A0A]"
        >
          CLOSE
        </button>
      </div>

      {/* Main Links - Oversized editorial typography */}
      <nav className="my-auto py-8">
        <ul className="space-y-4 sm:space-y-6">
          {navLinks.map((item, index) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline justify-between font-editorial text-4xl sm:text-5xl text-[#0A0A0A] hover:text-[#5A201C] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-ui text-xs text-[#B9B1A6] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom utilities */}
      <div className="border-t border-[#D8D5CF] pt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            type="button"
            className="min-h-[44px] text-xs uppercase tracking-widest text-[#242424] hover:text-[#0A0A0A] flex items-center gap-2"
          >
            <span>SEARCH</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Customer account portal: sign-in and order status.")}
            className="min-h-[44px] text-xs uppercase tracking-widest text-[#242424] hover:text-[#0A0A0A]"
          >
            ACCOUNT
          </button>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-[#666666]">
          SS26 COLLECTION 01 / REFINED ESSENTIALS
        </p>
      </div>
    </div>
  );
}
