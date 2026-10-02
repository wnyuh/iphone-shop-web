"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

/**
 * Nút Đăng xuất (Client Component):
 * Khi bấm:
 * 1. Gọi API /api/auth/logout để đưa token vào Denylist và xóa cookie.
 * 2. Chuyển hướng người dùng về trang /login.
 * 3. Làm mới giao diện (router.refresh()) để SiteHeader cập nhật lại trạng thái chưa đăng nhập.
 */
export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      // Điều hướng về /login và làm mới lại giao diện
      await router.push("/login");
      router.refresh();
    } catch {
      // Kể cả có lỗi mạng vẫn đưa về login
      await router.push("/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      title="Đăng xuất"
      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <>
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </>
      )}
    </button>
  );
}
