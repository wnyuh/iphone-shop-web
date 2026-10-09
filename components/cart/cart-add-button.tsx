"use client";

import { useCart } from "./cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem, setOpen } = useCart();

    return (
        <Button
            size="lg"
            className="w-full"
            onClick={() => {
                addItem(product);
                setOpen(true);
            }}
        >
            Thêm vào giỏ
        </Button>
    );
}
