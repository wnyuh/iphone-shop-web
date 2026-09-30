"use client";

// Error boundary bắt buộc là client component. Không in error.message ra UI.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container mx-auto px-6 py-10 space-y-4">
      <p className="text-destructive">Không tải được sản phẩm. Rails có đang chạy không?</p>
      <button onClick={reset} className="underline">
        Thử lại
      </button>
    </main>
  );
}
