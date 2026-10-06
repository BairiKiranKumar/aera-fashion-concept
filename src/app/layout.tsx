import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F2EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AERA | Contemporary Apparel & Modern Silhouettes",
  description:
    "A contemporary premium apparel label focused on refined essentials, modern silhouettes, and quiet confidence. Designed for movement. Made for everything after.",
  keywords: [
    "AERA",
    "contemporary apparel",
    "quiet luxury",
    "minimalist fashion",
    "refined essentials",
    "SS26 collection",
  ],
  authors: [{ name: "@kiranbuildswithai" }],
  openGraph: {
    title: "AERA | Contemporary Apparel & Modern Silhouettes",
    description:
      "A contemporary premium apparel label focused on refined essentials, modern silhouettes, and quiet confidence.",
    type: "website",
    locale: "en_US",
    siteName: "AERA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} scroll-smooth antialiased selection:bg-[#0A0A0A] selection:text-[#F5F2EC]`}
    >
      <body className="min-h-screen bg-[#F5F2EC] text-[#0A0A0A] font-sans overflow-x-hidden flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
