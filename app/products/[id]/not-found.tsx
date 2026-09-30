import Link from "next/link";

// Hiện khi page gọi notFound() (Rails 404, id không tồn tại hoặc không phải số)
export default function NotFound() {
  return (
    <main className="container mx-auto px-6 py-10 space-y-4">
      <h1 className="text-3xl font-semibold">Không tìm thấy sản phẩm</h1>
      <Link href="/" className="text-primary hover:underline">
        ‹ Quay lại cửa hàng
      </Link>
    </main>
  );
}
