import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/api";

export function useProducts( category?: string, sort?: string ) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let ignore = false; // response về sau khi effect đã cleanup → bỏ qua
    fetchProducts({ category, sort })
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((e: Error) => {
        if (!ignore) setError(e.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [category, sort]);
  return { products, loading, error };
}
