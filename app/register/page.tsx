"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MailCheck, Loader2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Vui lòng điền đầy đủ các thông tin bên dưới.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.email) {
          setErrorMessage(`Email: ${data.email.join(", ")}`);
        } else if (data.password) {
          setErrorMessage(`Mật khẩu: ${data.password.join(", ")}`);
        } else if (data.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.");
        }
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-20 bg-white text-neutral-900">
      <div className="w-full max-w-[460px] mx-auto text-center">
        {/* MÀN HÌNH THÔNG BÁO KHI ĐĂNG KÝ THÀNH CÔNG */}
        {isSuccess ? (
          <div className="py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-50 text-[#0071e3] rounded-full mx-auto flex items-center justify-center">
              <MailCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                Kiểm tra hộp thư của bạn
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">
                Chúng tôi đã gửi một liên kết xác nhận đến{" "}
                <strong className="text-neutral-900 font-medium">{email}</strong>. Vui lòng mở hộp thư
                (hoặc trang Mailtrap) và bấm vào liên kết để kích hoạt tài khoản.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full h-12 px-6 rounded-xl bg-neutral-900 text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Đi đến trang Đăng nhập
              </Link>
            </div>
          </div>
        ) : (
          /* FORM ĐĂNG KÝ */
          <>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-2">
              Tạo Tài Khoản
            </h1>

            <p className="text-base sm:text-lg text-neutral-500 font-normal mb-8">
              Chỉ cần một tài khoản để mua sắm tại iPhone Shop.
            </p>

            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-sm flex items-start gap-2.5 text-left">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  required
                  disabled={isLoading}
                  className="w-full h-14 px-4 text-base bg-white border border-neutral-300 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ Email"
                  required
                  disabled={isLoading}
                  className="w-full h-14 px-4 text-base bg-white border border-neutral-300 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu (ít nhất 6 ký tự)"
                  required
                  disabled={isLoading}
                  className="w-full h-14 px-4 text-base bg-white border border-neutral-300 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl bg-neutral-900 text-white font-medium text-base hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Tiếp tục"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-sm">
              <Link
                href="/login"
                className="text-[#0071e3] hover:underline inline-flex items-center gap-1 font-normal"
              >
                <span>Bạn đã có Tài khoản? Đăng nhập ngay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
