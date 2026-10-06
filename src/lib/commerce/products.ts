import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/commerce";

/**
 * Commerce Product Adapter
 * Decouples UI components from the data source.
 * When switching to Shopify Storefront API, swap the implementation here.
 */

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  newArrival?: boolean;
}): Promise<Product[]> {
  let items = [...PRODUCTS];

  if (options?.category) {
    items = items.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options?.featured !== undefined) {
    items = items.filter((p) => p.featured === options.featured);
  }

  if (options?.newArrival !== undefined) {
    items = items.filter((p) => p.newArrival === options.newArrival);
  }

  return items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.featured);
}
