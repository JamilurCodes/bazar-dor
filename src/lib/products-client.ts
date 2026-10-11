import type { Product } from "@/lib/products";
export async function getProductsClient(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) return data;
    }
  } catch {
    /* fall through */
  }
  return [];
}
export async function getCategoriesClient() {
  try {
    const res = await fetch("/api/categories", { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {
    /* fallback handled by product API */
  }
  return [];
}
