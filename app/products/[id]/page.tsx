import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/get-product-by-id";
import { categoryLabel, formatVnd } from "@/lib/api";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";

// Server Component: fetch chạy trên server, HTML đến browser đã có dữ liệu (Network tab không thấy request Rails).
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className="container mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-primary hover:underline">
        ‹ Quay lại cửa hàng
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductImage src={product.image_url} alt={product.name} sizes="(min-width:768px) 50vw, 100vw" priority />
        <div className="space-y-4">
          <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-2xl">{formatVnd(product.price)}</p>
          {product.description && <p className="text-muted-foreground">{product.description}</p>}
          {/* Phase 6: <AddToCartButton product={product} /> */}
        </div>
      </div>
    </main>
  );
}
