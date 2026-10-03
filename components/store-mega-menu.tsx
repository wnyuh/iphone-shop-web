"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export function StoreMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mở menu khi hover hoặc click
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Đóng có độ trễ nhẹ (grace period) để di chuột mượt mà giữa nút và menu
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  }, []);

  // Lắng nghe phím Escape và click ngoài để đóng menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nút kích hoạt trên thanh điều hướng */}
      <button
        type="button"
        onClick={handleToggleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`hover:text-white transition-colors cursor-pointer py-2 focus:outline-none ${
          isOpen ? "text-white" : "text-neutral-300"
        }`}
      >
        Cửa Hàng
      </button>

      {/* Lớp phủ mờ nền (Backdrop Blur Overlay) toàn trang phía dưới */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-11 bg-black/40 backdrop-blur-md z-40 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      />

      {/* Bảng Mega Menu lớn nền trắng trượt xuống */}
      <div
        role="region"
        aria-label="Cửa Hàng Menu"
        className={`fixed left-0 right-0 top-11 w-full bg-white text-neutral-900 border-b border-neutral-200/90 shadow-[0_30px_60px_rgba(0,0,0,0.12)] z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible max-h-[85vh] overflow-y-auto"
            : "opacity-0 -translate-y-3 pointer-events-none invisible max-h-0 overflow-hidden"
        }`}
      >
        <div className="max-w-[1024px] mx-auto px-6 sm:px-8 pt-10 pb-16">
          {/* Bố cục 3 cột cách xa nhau chuẩn phong cách Apple */}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-20">
            {/* Cột 1: Cột chính bên trái - Mua Hàng */}
            <div>
              <p className="text-[12px] font-normal text-neutral-400 tracking-wide mb-3 select-none">
                Mua Hàng
              </p>
              <ul className="space-y-3 list-none p-0 m-0">
                {[
                  { title: "Mua Sắm Sản Phẩm Mới Nhất", href: "/store" },
                  { title: "Mac", href: "/store?category=mac" },
                  { title: "iPad", href: "/store?category=ipad" },
                  { title: "iPhone", href: "/store?category=iphone" },
                  { title: "Apple Watch", href: "/store?category=apple_watch" },
                  { title: "AirPods", href: "/store?category=airpods" },
                  { title: "Phụ Kiện", href: "/store?category=accessories" },
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="block text-[22px] sm:text-[24px] font-semibold text-neutral-900 hover:text-neutral-500 transition-colors tracking-tight leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 2: Ở giữa - Liên Kết Nhanh */}
            <div>
              <p className="text-[12px] font-normal text-neutral-400 tracking-wide mb-4 select-none">
                Liên Kết Nhanh
              </p>
              <ul className="space-y-3 list-none p-0 m-0">
                {[
                  { title: "Tình Trạng Đơn Hàng", href: "/#order-status" },
                  { title: "Apple Trade In", href: "/#trade-in" },
                  { title: "Tài Chính", href: "/#financing" },
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="block text-[13px] font-normal text-neutral-800 hover:text-black hover:underline transition-all"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: Bên phải - Mua Tại Cửa Hàng Đặc Biệt */}
            <div>
              <p className="text-[12px] font-normal text-neutral-400 tracking-wide mb-4 select-none">
                Mua Tại Cửa Hàng Đặc Biệt
              </p>
              <ul className="space-y-3 list-none p-0 m-0">
                {[
                  { title: "Giáo Dục", href: "/#education" },
                  { title: "Doanh Nghiệp", href: "/#business" },
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="block text-[13px] font-normal text-neutral-800 hover:text-black hover:underline transition-all"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
