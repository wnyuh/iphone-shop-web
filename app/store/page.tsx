import { Suspense } from "react";
import { ProductCatalog } from "@/components/product-catalog";

export const metadata = {
  title: "Cửa Hàng - Apple Store",
  description: "Khám phá các sản phẩm Mac, iPhone, iPad, Apple Watch, AirPods và Phụ kiện mới nhất.",
};

export default function StorePage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Cửa Hàng. <span className="text-neutral-500 font-normal">Cách tốt nhất để mua các sản phẩm bạn yêu thích.</span>
        </h1>
        <p className="text-sm text-neutral-500">
          Sản phẩm chính hãng Apple với đầy đủ bảo hành và ưu đãi thanh toán trực tuyến.
        </p>
      </div>

      <Suspense fallback={<div className="py-12 text-center text-neutral-500">Đang tải danh sách sản phẩm...</div>}>
        <ProductCatalog />
      </Suspense>
    </main>
  );
}
