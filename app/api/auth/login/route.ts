import { NextRequest, NextResponse } from "next/server";
import { railsFetch } from "@/lib/rails-server";
import { setAuthCookie } from "@/lib/auth-cookie";

/**
 * Kiểm tra xem request có xuất phát từ chính trang web của mình không (Same-Origin).
 * Chống tấn công CSRF.
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

/**
 * POST /api/auth/login
 * Nhận email và password từ Client form, chuyển tiếp sang Rails POST /auth/login.
 * Nếu đăng nhập thành công, lưu token JWT vào HttpOnly Cookie và trả thông tin user về cho client.
 */
export async function POST(request: NextRequest) {
  // 1. Kiểm tra an ninh: Chỉ chấp nhận yêu cầu từ chính trang web của mình
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: "Yêu cầu bị từ chối: Nguồn gốc (Origin) không hợp lệ" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // 2. Chuyển tiếp sang Rails API (Rails mong đợi { user: { email, password } })
    const res = await railsFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    });

    const data = await res.json();

    // 3. Nếu Rails báo lỗi (401 sai email/mật khẩu, 403 chưa xác nhận email...), trả lỗi về cho client
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    // 4. Đăng nhập thành công: Rails trả về { token: "...", user: { ... } }
    // Ghi token JWT vào HttpOnly Cookie (được bảo vệ an toàn, JS không đọc được)
    if (data.token) {
      await setAuthCookie(data.token);
    }

    // 5. Trả thông tin user về cho client (không cần kèm token vì cookie đã tự động lưu)
    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch {
    // Nếu Rails bị sập hoặc timeout quá 5s
    return NextResponse.json(
      { error: "Không thể kết nối đến máy chủ Rails (vui lòng thử lại sau)" },
      { status: 502 }
    );
  }
}
