import { ProductCatalog } from "@/components/product-catalog";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Cửa hàng</h1>
        <Suspense fallback={<p>Đang tải…</p>}>
            <ProductCatalog />
        </Suspense>
    </main>
  );
}
