export type Product = {
  id: number;
  name: string;
  category: string;
  description: string | null;
  price: string; // Rails decimal → chuỗi "250000.0"
  image_url: string | null; // cột mới phase 1
  created_at: string;
  updated_at: string;
};

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
// Nhận cả string (từ Rails) lẫn number (tổng tiền giỏ hàng)
export const formatVnd = (value: string | number) => vnd.format(Number(value));

export async function fetchProducts(): Promise<Product[]> {
  const params = new URLSearchParams({ per_page: "100" });
  const res = await fetch(`/api/products?${params}`);
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? `Lỗi ${res.status}`);
  return body;
}
