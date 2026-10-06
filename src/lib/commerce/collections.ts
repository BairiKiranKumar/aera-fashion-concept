import { COLLECTIONS } from "@/data/products";
import { Collection } from "@/types/commerce";

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const col = COLLECTIONS.find((c) => c.slug === slug);
  return col || null;
}
