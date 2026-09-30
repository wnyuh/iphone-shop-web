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

// Cố định, khớp seed phase 1, KHÔNG suy từ fetch (tránh gọi thêm 1 lần toàn catalog chỉ để tính tabs)
export const CATEGORIES = ["cable", "case", "charger", "screen_protector"] as const;

// Nhãn tiếng Việt CHỈ để hiển thị; giá trị gốc (key) vẫn là thứ gửi lên URL/API
export const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  cable: "Cáp sạc",
  case: "Ốp lưng",
  charger: "Củ sạc",
  screen_protector: "Kính cường lực",
};

// Category từ Rails là string tuỳ ý → category chưa có trong map thì hiện giá trị gốc
export const categoryLabel = (category: string) =>
  CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;

export const SORT_OPTIONS = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá: thấp → cao" },
  { value: "price-desc", label: "Giá: cao → thấp" },
] as const;

// "featured" không có trong map: không gửi sort, Rails tự order theo id
const SORT_TO_RAILS: Record<string, string> = { "price-asc": "price", "price-desc": "-price" };

export async function fetchProducts(
    opts: { category?: string; sort?: string } = {},
): Promise<Product[]> {
  const params = new URLSearchParams({ per_page: "100" });
  if (opts.category) params.set("category", opts.category);
  const railsSort = opts.sort && SORT_TO_RAILS[opts.sort];
  if (railsSort) params.set("sort", railsSort); // chỉ gửi giá trị nằm trong whitelist
  const res = await fetch(`/api/products?${params}`);
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? `Lỗi ${res.status}`);
  return body;
}
