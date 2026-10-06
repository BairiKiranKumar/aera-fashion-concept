"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    addToCart,
  } = useCart();

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
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  // Single restrained recommendation if cart is not empty
  const recommendation = PRODUCTS.find((p) => p.slug === "aera-ribbed-tank");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#0A0A0A]/40 transition-opacity backdrop-blur-[2px]"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <aside className="w-screen max-w-md bg-[#F5F2EC] shadow-2xl flex flex-col border-l border-[#D8D5CF]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#D8D5CF]">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-2xl tracking-wide text-[#0A0A0A]">
                SHOPPING BAG
              </span>
              <span className="text-xs uppercase tracking-widest text-[#666666]">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={closeCart}
              type="button"
              aria-label="Close bag"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs uppercase tracking-widest text-[#242424] hover:text-[#0A0A0A] transition-colors"
            >
              CLOSE
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#D8D5CF]/60">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <p className="font-editorial text-3xl text-[#0A0A0A] mb-3">
                  Your bag is empty
                </p>
                <p className="text-xs uppercase tracking-widest text-[#666666] mb-8 max-w-xs">
                  Discover refined essentials tailored for movement and quiet confidence.
                </p>
                <button
                  onClick={closeCart}
                  type="button"
                  className="min-h-[44px] px-8 py-3 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest hover:bg-[#242424] transition-colors"
                >
                  EXPLORE COLLECTION
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6 pb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                      <div className="relative w-20 h-28 bg-[#EAE6DF] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xs uppercase tracking-wide font-medium text-[#0A0A0A]">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              type="button"
                              aria-label={`Remove ${item.name}`}
                              className="text-[11px] uppercase tracking-wider text-[#666666] hover:text-[#0A0A0A] p-1"
                            >
                              REMOVE
                            </button>
                          </div>
                          <p className="text-[11px] text-[#666666] uppercase tracking-wider mt-1">
                            {item.color} / SIZE {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#D8D5CF]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              type="button"
                              aria-label="Decrease quantity"
                              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-sm text-[#0A0A0A] hover:bg-[#EAE6DF]"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-[#0A0A0A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              type="button"
                              aria-label="Increase quantity"
                              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-sm text-[#0A0A0A] hover:bg-[#EAE6DF]"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-medium text-[#0A0A0A]">
                            {item.currency}
                            {(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Restrained recommendation */}
                {recommendation && (
                  <div className="pt-6">
                    <p className="text-[11px] uppercase tracking-widest text-[#666666] mb-3">
                      PAIRS WELL WITH
                    </p>
                    <div className="flex items-center justify-between p-3 bg-[#EAE6DF]/60 border border-[#D8D5CF]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 bg-[#D8D5CF] overflow-hidden">
                          <Image
                            src={recommendation.images.primary}
                            alt={recommendation.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-medium text-[#0A0A0A]">
                            {recommendation.name}
                          </p>
                          <p className="text-[11px] text-[#666666]">
                            {recommendation.currency}
                            {recommendation.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            productId: recommendation.id,
                            slug: recommendation.slug,
                            name: recommendation.name,
                            price: recommendation.price,
                            currency: recommendation.currency,
                            color: recommendation.colors[0].name,
                            size: recommendation.sizes[1] || "S",
                            quantity: 1,
                            image: recommendation.images.primary,
                          })
                        }
                        type="button"
                        className="text-[11px] uppercase tracking-widest font-medium text-[#0A0A0A] underline hover:no-underline px-2 py-2"
                      >
                        + ADD
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer with subtotal and checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D8D5CF] bg-[#F5F2EC]">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs uppercase tracking-widest text-[#666666]">
                  SUBTOTAL
                </span>
                <span className="font-editorial text-2xl text-[#0A0A0A]">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-[#666666] mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full min-h-[48px] bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest font-medium hover:bg-[#242424] transition-colors flex items-center justify-center text-center"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
