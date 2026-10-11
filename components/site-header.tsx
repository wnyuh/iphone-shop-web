import Link from "next/link";
import { Search, User } from "lucide-react";
import { BeeLogo } from "@/components/bee-logo";
import { getCurrentUser } from "@/lib/get-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { StoreMegaMenu } from "@/components/store-mega-menu";
import { CartSheet } from "@/components/cart/cart-sheet";

/**
 * SiteHeader - Server Component:
 * - Tự động đọc cookie và kiểm tra người dùng đã đăng nhập hay chưa.
 * - CartSheet là Client Component (dùng useCart) → render trong Server Component OK.
 */
export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-[#161617]/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-[1024px] mx-auto px-4 h-11 flex items-center justify-between text-[12px] text-neutral-300">
        {/* Logo */}
        <Link
          href="/"
          className="text-white hover:opacity-70 transition-opacity p-1 flex items-center"
          title="Trang chủ"
        >
          <BeeLogo className="w-4 h-4 text-white" />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center space-x-7 font-normal tracking-tight text-neutral-300">
          <StoreMegaMenu />
          <Link href="/store?category=mac" className="hover:text-white transition-colors">Mac</Link>
          <Link href="/store?category=ipad" className="hover:text-white transition-colors">iPad</Link>
          <Link href="/store?category=iphone" className="hover:text-white transition-colors">iPhone</Link>
          <Link href="/store?category=apple_watch" className="hover:text-white transition-colors">Watch</Link>
          <Link href="/store?category=airpods" className="hover:text-white transition-colors">AirPods</Link>
          <Link href="/store?category=tv_home" className="hover:text-white transition-colors">TV & Nhà</Link>
          <Link href="/#entertainment" className="hover:text-white transition-colors">Giải Trí</Link>
          <Link href="/store?category=accessories" className="hover:text-white transition-colors">Phụ Kiện</Link>
          <Link href="/#support" className="hover:text-white transition-colors">Hỗ Trợ</Link>
        </nav>

        {/* Right side: Search, Cart, User */}
        <div className="flex items-center space-x-4 text-neutral-300">
          <button aria-label="Tìm kiếm" className="hover:text-white transition-colors cursor-pointer">
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* CartSheet - Client Component */}
          <CartSheet />

          {/* User status */}
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