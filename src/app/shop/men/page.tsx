import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopView } from "@/components/shop/ShopView";
import { getProducts } from "@/lib/commerce/products";

export const metadata = {
  title: "Men's Collection | AERA",
  description:
    "AERA Men: modern outerwear, minimal tailoring, and unhurried craftsmanship.",
};

export default async function MenShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1">
        <ShopView
          initialProducts={products}
          title="Men"
          subtitle="Minimal outerwear, clean stride trousers, and balanced layers crafted in virgin wool and heavy cotton."
          categoryFilter="men"
        />
      </main>
      <Footer />
    </div>
  );
}
