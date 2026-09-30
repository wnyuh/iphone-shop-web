import { railsFetch } from "@/lib/rails-server";
import type { Product } from "@/lib/api";

// null = Rails trả 404. Lỗi khác/Rails tắt → throw để error.tsx bắt.
// Chỉ gọi từ server (Server Component): fetch thẳng Rails, không qua Route Handler /api.
export async function getProduct(id: string): Promise<Product | null> {
  const res = await railsFetch(`/products/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Rails trả về ${res.status}`);
  return res.json();
}
