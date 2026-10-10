import { railsFetch } from "@/lib/rails-server";
import type { Product } from "@/lib/api";

// Chỉ gọi từ server. Rails tắt/lỗi → trả mảng rỗng để trang vẫn render (các khối phụ tự ẩn).
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await railsFetch("/products?per_page=100");
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
