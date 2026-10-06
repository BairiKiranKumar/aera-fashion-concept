import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopView } from "@/components/shop/ShopView";
import { getProducts } from "@/lib/commerce/products";

export const metadata = {
  title: "Women's Collection | AERA",
  description:
    "AERA Women: structured overshirts, fluid tailored trousers, and sculpted tops engineered for quiet confidence.",
};

export default async function WomenShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1">
        <ShopView
          initialProducts={products}
          title="Women"
          subtitle="Sculpted proportions and fluid draping. Structured overshirts, relaxed trousers, and foundational knitwear."
          categoryFilter="women"
        />
      </main>
      <Footer />
    </div>
  );
}
