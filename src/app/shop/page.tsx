import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopView } from "@/components/shop/ShopView";
import { getProducts } from "@/lib/commerce/products";

export const metadata = {
  title: "Shop All | AERA",
  description:
    "Explore the complete AERA SS26 collection. Refined essentials and modern silhouettes crafted for movement.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1">
        <ShopView
          initialProducts={products}
          title="All Garments"
          subtitle="Refined silhouettes, architectural tailoring, and modular essentials designed for continuous motion."
        />
      </main>
      <Footer />
    </div>
  );
}
