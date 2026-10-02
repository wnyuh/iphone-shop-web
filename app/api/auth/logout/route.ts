import { NextRequest, NextResponse } from "next/server";
import { railsFetch } from "@/lib/rails-server";
import { getAuthToken, deleteAuthCookie } from "@/lib/auth-cookie";

/**
 * Kiểm tra xem request có xuất phát từ chính trang web của mình không (Same-Origin).
 * Chống tấn công CSRF.
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

/**
 * POST /api/auth/logout
 * Đăng xuất:
 * 1. Lấy token JWT từ HttpOnly cookie.
 * 2. Gửi sang Rails POST /auth/logout (kèm Authorization: Bearer <token>) để Rails đưa token vào Denylist (sổ đen).
 * 3. Xóa HttpOnly cookie khỏi trình duyệt.
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
    const token = await getAuthToken();

    // 2. Nếu có token, báo cho Rails biết để Rails ghi token này vào sổ đen (Denylist)
    if (token) {
      await railsFetch("/auth/logout",
          {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // 3. Xóa sạch cookie xác thực trên trình duyệt của người dùng
    await deleteAuthCookie();

    return NextResponse.json({ message: "Đăng xuất thành công" }, { status: 200 });
  } catch {
    // Kể cả nếu Rails backend gặp sự cố mạng, ta vẫn xóa cookie ở trình duyệt để người dùng đăng xuất an toàn
    await deleteAuthCookie();
    return NextResponse.json({ message: "Đã đăng xuất khỏi trình duyệt" }, { status: 200 });
  }
}
