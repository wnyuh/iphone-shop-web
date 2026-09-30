"use client";

import { useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/use-products";
import { normalizeText } from "@/lib/normalize-vietnamese-text";

type Props = {
    category?: string;
    sort: string;
    q: string;
    onClearSearch: () => void;
};

export function ProductGrid({ category, sort, q, onClearSearch }: Props) {
    const { products, loading, error } = useProducts(category, sort);

    const needle = normalizeText(q);
    const visible = useMemo(
        () => (needle ? products.filter((p) => normalizeText(p.name).includes(needle)) : products),
        [products, needle],
    );

    if (error) return <p className="text-destructive">{error}</p>;
    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }, (_, i) => (
                    <Skeleton key={i} className="aspect-square w-full" />
                ))}
            </div>
        );
    }
    if (needle && visible.length === 0) {
        return (
            <div>
                <p>Không tìm thấy sản phẩm cho “{q}”</p>
                <Button variant="link" onClick={onClearSearch}>
                    Xoá tìm kiếm
                </Button>
            </div>
        );
    }
    if (products.length === 0) {
        return <p>{category ? "Không có sản phẩm khớp bộ lọc" : "Chưa có sản phẩm"}</p>;
    }
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
