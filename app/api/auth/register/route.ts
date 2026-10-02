import { NextRequest, NextResponse } from "next/server";
import { railsFetch } from "@/lib/rails-server";

/**
 * Kiểm tra xem request có xuất phát từ chính trang web của mình không (Same-Origin).
 * Chống tấn công CSRF (khi trang web độc hại bên ngoài cố tình gửi request lén tới API của mình).
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  // Nếu request có gửi kèm header Origin, nó phải trùng khớp với URL gốc của web Next.js
  return !origin || origin === request.nextUrl.origin;
}

/**
 * POST /api/auth/register
 * Nhận thông tin đăng ký (name, email, password) từ Client,
 * kiểm tra bảo mật, sau đó chuyển tiếp (proxy) sang Rails backend.
 */
export async function POST(request: NextRequest) {
  // 1. Kiểm tra an ninh: Chỉ chấp nhận yêu cầu gửi từ chính website của mình
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: "Yêu cầu bị từ chối: Nguồn gốc (Origin) không hợp lệ" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Chuyển tiếp sang Rails API (Rails mong đợi cấu trúc { user: { name, email, password } })
    const res = await railsFetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { name, email, password } }),
    });

    const data = await res.json();

    // 3. Trả kết quả (201 Created khi thành công, hoặc 422 khi trùng email/lỗi validate) về cho Client
    return NextResponse.json(data, { status: res.status });
  } catch {
    // Nếu Rails bị sập hoặc timeout quá 5s
    return NextResponse.json(
      { error: "Không thể kết nối đến máy chủ Rails (vui lòng thử lại sau)" },
      { status: 502 }
    );
  }
}
