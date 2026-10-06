import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { getProductBySlug, getProducts } from "@/lib/commerce/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Garment Not Found | AERA",
    };
  }

  return {
    title: `${product.name} | AERA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="solid" />
      <main className="flex-1">
        <ProductDetailView product={product} relatedProducts={related} />
      </main>
      <Footer />
    </div>
  );
}
