import { redirect } from "next/navigation";
import Link from "next/link";
import { railsFetch } from "@/lib/rails-server";
import { AlertCircle, ArrowLeft } from "lucide-react";

/**
 * Trang xác nhận tài khoản (Server Component):
 * Khi người dùng bấm vào link trong email Mailtrap:
 * http://localhost:3001/confirm?token=...
 *
 * Trang này sẽ:
 * 1. Lấy token từ query URL.
 * 2. Gọi sang Rails API GET /auth/confirm?token=... để kích hoạt tài khoản.
 * 3. Nếu thành công -> tự động redirect sang /login?confirmed=1 để người dùng đăng nhập.
 * 4. Nếu thất bại (link hết hạn/sai mã) -> hiển thị thông báo lỗi.
 */
interface ConfirmPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const { token } = await searchParams;

  // Trường hợp người dùng gõ thẳng /confirm mà không có token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-sans text-neutral-900">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold">Thiếu mã xác nhận</h1>
          <p className="text-neutral-500 text-sm">
            Đường dẫn xác nhận không chứa mã hợp lệ. Vui lòng kiểm tra lại email của bạn.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-[#0071e3] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại trang Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let success = false;
  let errorMessage: string | null = null;

  try {
    // Gọi Rails backend để kích hoạt tài khoản (set confirmed = true)
    const res = await railsFetch(`/auth/confirm?token=${encodeURIComponent(token)}`);
    if (res.ok) {
      success = true;
    } else {
      const data = await res.json().catch(() => ({}));
      errorMessage = data.error || "Liên kết xác nhận không hợp lệ hoặc đã hết hạn.";
    }
  } catch {
    errorMessage = "Không thể kết nối đến máy chủ Rails. Vui lòng thử lại sau.";
  }

  // Nếu xác nhận thành công -> tự động đưa người dùng về trang đăng nhập
  if (success) {
    redirect("/login?confirmed=1");
  }

  // Nếu có lỗi (hết hạn 24h hoặc mã giả) -> hiển thị giao diện thông báo
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white font-sans text-neutral-900">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-semibold">Xác nhận thất bại</h1>
        <p className="text-neutral-500 text-sm leading-relaxed">
          {errorMessage}
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-[#0071e3] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
