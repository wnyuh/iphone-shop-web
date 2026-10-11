import { NextRequest, NextResponse } from "next/server";
import { railsFetch } from "@/lib/rails-server";

// Proxy: browser → /api/products?... → Rails /products?... (không dính CORS)
// Whitelist: chỉ forward param Rails hỗ trợ, KHÔNG re-serialize nguyên searchParams —
// tránh mọi param Rails thêm sau này vô tình lộ ra qua proxy mà không được review.
const ALLOWED_PARAMS = ["category", "sort", "per_page", "page", "q"] as const;

export async function GET(request: NextRequest) {
  const incoming = request.nextUrl.searchParams;
  const params = new URLSearchParams();
  for (const key of ALLOWED_PARAMS) {
    const value = incoming.get(key);
    if (value) params.set(key, value);
  }
  try {
    const res = await railsFetch(`/products?${params.toString()}`);
    if (!res.ok) return NextResponse.json({ error: `Rails trả về ${res.status}` }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Không kết nối được Rails API (timeout hoặc lỗi mạng)" }, { status: 502 });
  }
}
