"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isConfirmed = searchParams.get("confirmed") === "1";

  // Quản lý luồng 2 bước chuẩn Apple: Bước 1 (email) -> Bước 2 (password)
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập email của bạn.");
      return;
    }
    setStep("password");
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!password) {
      setErrorMessage("Vui lòng nhập mật khẩu của bạn.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Email hoặc mật khẩu không chính xác.");
        setIsLoading(false);
        return;
      }

      await router.push("/");
      router.refresh();
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-24 bg-white text-neutral-900">
      <div className="w-full max-w-[460px] mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-2">
          Đăng nhập để thanh toán nhanh hơn.
        </h1>

        <p className="text-base sm:text-lg text-neutral-500 font-normal mb-8">
          Đăng nhập vào iPhone Shop
        </p>

        {/* Thông báo xác nhận thành công nếu chuyển hướng từ /confirm?confirmed=1 */}
        {isConfirmed && !errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-sm flex items-start gap-2.5 text-left">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
            <span>Xác nhận tài khoản thành công! Bây giờ bạn có thể đăng nhập.</span>
          </div>
        )}

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-sm flex items-start gap-2.5 text-left">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* BƯỚC 1: EMAIL */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email hoặc số điện thoại"
                required
                autoFocus
                className="w-full h-14 pl-4 pr-14 text-base bg-white border border-neutral-300 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
              <button
                type="submit"
                disabled={!email.trim()}
                aria-label="Tiếp tục"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900 text-white disabled:bg-neutral-200 disabled:text-neutral-400 flex items-center justify-center transition-all hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-neutral-600 select-none cursor-pointer">
                Lưu tôi
              </label>
            </div>
          </form>
        )}

        {/* BƯỚC 2: MẬT KHẨU */}
        {step === "password" && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="text-sm text-neutral-600 flex items-center justify-center gap-2 mb-2">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setErrorMessage(null);
                }}
                className="text-[#0071e3] hover:underline cursor-pointer"
              >
                Thay đổi
              </button>
            </div>

            <div className="relative w-full">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                required
                autoFocus
                disabled={isLoading}
                className="w-full h-14 pl-4 pr-14 text-base bg-white border border-neutral-300 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
              <button
                type="submit"
                disabled={!password || isLoading}
                aria-label="Đăng nhập"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900 text-white disabled:bg-neutral-200 disabled:text-neutral-400 flex items-center justify-center transition-all hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <input
                type="checkbox"
                id="rememberMePassword"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
              />
              <label htmlFor="rememberMePassword" className="text-sm text-neutral-600 select-none cursor-pointer">
                Lưu tôi
              </label>
            </div>
          </form>
        )}

        <div className="mt-10 space-y-3 text-sm">
          <div>
            <Link
              href="#"
              className="text-[#0071e3] hover:underline inline-flex items-center gap-1 font-normal"
            >
              <span>Bạn đã quên mật khẩu?</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div>
            <Link
              href="/register"
              className="text-[#0071e3] hover:underline inline-flex items-center gap-1 font-normal"
            >
              <span>Bạn không có Tài khoản? Tạo Tài khoản</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginFormContent />
    </Suspense>
  );
}
