import React from "react";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { BeeLogo } from "@/components/bee-logo";
import { getCurrentUser } from "@/lib/get-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

/**
 * Thanh điều hướng toàn trang (SiteHeader - Server Component):
 * - Tự động đọc cookie và kiểm tra người dùng đã đăng nhập hay chưa.
 * - Nếu đã đăng nhập: hiển thị "Xin chào, {tên}" và nút "Đăng xuất".
 * - Nếu chưa: hiển thị link "Đăng nhập".
 */
export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-[#161617]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-[1024px] mx-auto px-4 h-11 flex items-center justify-between text-[12px] text-neutral-300">
        {/* Logo con ong góc trái */}
        <Link
          href="/"
          className="text-white hover:opacity-70 transition-opacity p-1 flex items-center"
          title="Trang chủ"
        >
          <BeeLogo className="w-4 h-4 text-white" />
        </Link>

        {/* Các mục menu chữ nhỏ, cách đều nhau */}
        <nav className="hidden md:flex items-center space-x-7 font-normal tracking-tight text-neutral-300">
          <Link href="/" className="hover:text-white transition-colors">Cửa Hàng</Link>
          <Link href="#mac" className="hover:text-white transition-colors">Mac</Link>
          <Link href="#ipad" className="hover:text-white transition-colors">iPad</Link>
          <Link href="#iphone" className="hover:text-white transition-colors">iPhone</Link>
          <Link href="#watch" className="hover:text-white transition-colors">Watch</Link>
          <Link href="#airpods" className="hover:text-white transition-colors">AirPods</Link>
          <Link href="#tv-home" className="hover:text-white transition-colors">TV & Nhà</Link>
          <Link href="#entertainment" className="hover:text-white transition-colors">Giải Trí</Link>
          <Link href="#accessories" className="hover:text-white transition-colors">Phụ Kiện</Link>
          <Link href="#support" className="hover:text-white transition-colors">Hỗ Trợ</Link>
        </nav>

        {/* Góc phải: Tìm kiếm, Túi hàng, và Trạng thái Tài khoản */}
        <div className="flex items-center space-x-4 text-neutral-300">
          <button aria-label="Tìm kiếm" className="hover:text-white transition-colors cursor-pointer">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button aria-label="Túi hàng" className="hover:text-white transition-colors cursor-pointer">
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>

          {/* Phần trạng thái người dùng */}
          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-neutral-700">
              <span className="text-neutral-200 text-xs truncate max-w-[120px]">
                Xin chào, <strong className="font-semibold text-white">{user.name}</strong>
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white transition-colors pl-2 border-l border-neutral-700"
            >
              <User className="w-3.5 h-3.5" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
