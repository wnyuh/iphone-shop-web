import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { categoryLabel, formatVnd, type Product } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="space-y-2">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          />
          <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
          <p className="font-semibold">{product.name}</p>
          <p>{formatVnd(product.price)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
