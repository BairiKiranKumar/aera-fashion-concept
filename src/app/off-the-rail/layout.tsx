import type { Metadata, Viewport } from "next";
import { Yellowtail, Instrument_Sans } from "next/font/google";
import "@/styles/off-the-rail.css";

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Off the Rail | Art-led tees and shirts from London",
  description: "Small-batch art-led tees and shirts from London, new drop every Friday.",
  openGraph: {
    title: "Off the Rail",
    description: "Small-batch art-led tees and shirts from London, new drop every Friday.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#E7E7E4",
};

export default function OffTheRailLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${yellowtail.variable} ${instrumentSans.variable} otr-root`}>{children}</div>;
}
