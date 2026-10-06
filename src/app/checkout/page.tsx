"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const shippingCost = subtotal > 5000 ? 0 : 490;
  const orderTotal = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1 pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="border-b border-[#D8D5CF] pb-6 mb-10 flex justify-between items-baseline">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block mb-1">
                CHECKOUT
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl text-[#0A0A0A]">
                Order Details
              </h1>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-[#0A0A0A] hover:text-[#5A201C] underline"
            >
              RETURN TO CATALOGUE
            </Link>
          </div>

          {isSubmitted ? (
            <div className="bg-[#EAE6DF]/70 border border-[#D8D5CF] p-8 md:p-14 text-center max-w-xl mx-auto my-12 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#666666] block">
                ORDER CONFIRMED
              </span>
              <h2 className="font-editorial text-4xl text-[#0A0A0A]">
                Thank you for your order.
              </h2>
              <p className="text-xs sm:text-sm text-[#242424] font-light leading-relaxed">
                A confirmation summary has been logged for {formData.email || "your account"}. In a production deployment, this checkout transfers directly to the Shopify Storefront API checkout token.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center min-h-[44px] px-8 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest font-medium hover:bg-[#242424]"
                >
                  RETURN TO HOME
                </Link>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <p className="font-editorial text-3xl text-[#0A0A0A]">
                Your shopping bag is empty
              </p>
              <p className="text-xs uppercase tracking-widest text-[#666666] mb-8">
                Select garments from our collection before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center min-h-[44px] px-8 bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-widest font-medium"
              >
                BROWSE COLLECTION
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Contact & Delivery Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0A] mb-4">
                      CONTACT INFORMATION
                    </h3>
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0A] mb-4">
                      SHIPPING ADDRESS
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="FIRST NAME"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="LAST NAME"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="STREET ADDRESS"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="CITY"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="POSTAL CODE"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              postalCode: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-xs text-[#0A0A0A] placeholder:text-[#666666] focus:outline-none focus:border-[#0A0A0A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Notice */}
                  <div className="p-4 bg-[#EAE6DF]/60 border border-[#D8D5CF] text-xs text-[#666666] leading-relaxed">
                    <p className="font-medium text-[#0A0A0A] uppercase tracking-wider mb-1">
                      SHOPIFY STOREFRONT READY
                    </p>
                    <p>
                      In production, clicking complete transfers to the encrypted Shopify PCI-compliant payment gateway.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[50px] bg-[#0A0A0A] text-[#F5F2EC] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#242424] transition-colors"
                  >
                    COMPLETE ORDER (₹{orderTotal.toLocaleString("en-IN")})
                  </button>
                </form>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#EAE6DF]/40 border border-[#D8D5CF] p-6 space-y-6">
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0A] border-b border-[#D8D5CF] pb-3">
                  SUMMARY ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)
                </h3>

                <div className="space-y-4 divide-y divide-[#D8D5CF]/60">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                      <div className="relative w-16 h-20 bg-[#EAE6DF] shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5 text-xs">
                        <div>
                          <p className="uppercase font-medium text-[#0A0A0A]">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#666666] uppercase mt-0.5">
                            {item.color} / SIZE {item.size} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-[#0A0A0A]">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#D8D5CF] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-[#666666]">
                    <span>SUBTOTAL</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>EXPRESS DELIVERY</span>
                    <span>
                      {shippingCost === 0 ? "COMPLIMENTARY" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#0A0A0A] pt-2 border-t border-[#D8D5CF]">
                    <span>TOTAL</span>
                    <span className="font-editorial text-xl">
                      ₹{orderTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
