import { cookies } from "next/headers";

// Tên của cookie dùng để lưu chuỗi JWT
export const AUTH_COOKIE_NAME = "auth_token";

// Thời hạn sống của cookie: 24 giờ (đơn vị: giây)
// Khớp với thời hạn hết hạn của JWT bên Rails backend (24h)
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24;

/**
 * Đọc token JWT từ cookie của request hiện tại.
 * Dùng được trong Server Component và Route Handler.
 */
export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

/**
 * Ghi cookie chứa JWT vào trình duyệt của người dùng.
 * Chỉ gọi được trong Route Handler hoặc Server Action.
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    // Bảo mật: JavaScript ở trình duyệt (document.cookie) KHÔNG THỂ đọc được cookie này (chống lộ token qua tấn công XSS)
    httpOnly: true,
    // Chỉ bắt buộc gửi qua HTTPS khi lên môi trường production (ở local chạy http://localhost vẫn dùng được)
    secure: process.env.NODE_ENV === "production",
    // Chống tấn công CSRF: trình duyệt chỉ gửi cookie này khi người dùng điều hướng an toàn trong cùng trang web hoặc bấm link trực tiếp
    sameSite: "lax",
    // Cookie tự động hết hạn sau 24 giờ
    maxAge: AUTH_COOKIE_MAX_AGE,
    // Cookie có hiệu lực trên toàn bộ các trang của website ("/")
    path: "/",
  });
}

/**
 * Xóa cookie xác thực khi người dùng đăng xuất.
 */
export async function deleteAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
