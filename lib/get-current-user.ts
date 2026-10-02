import { getAuthToken } from "@/lib/auth-cookie";
import { railsFetch } from "@/lib/rails-server";

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  confirmed: boolean;
}

/**
 * Đọc thông tin người dùng đang đăng nhập từ HttpOnly cookie.
 * CHỈ dùng trong Server Component (như SiteHeader) hoặc Route Handler.
 * Nếu chưa đăng nhập hoặc token đã bị đưa vào Denylist -> trả về null.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const res = await railsFetch("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
