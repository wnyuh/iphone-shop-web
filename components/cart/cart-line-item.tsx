"use client";

import { useCart } from "./cart-provider";
import { formatVnd } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";

interface CartLineItemProps {
    item: {
        productId: number;
        name: string;
        price: number;
        imageUrl: string | null;
        quantity: number;
    };
}
export function CartLineItem({ item }: CartLineItemProps) {
    const { setQuantity, removeItem } = useCart();

    return (
        <div className="flex gap-3 items-center py-2">
            {/* Ảnh 64px - dùng ProductImage */}
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                <ProductImage
                    src={item.imageUrl}
                    alt={item.name}
                    sizes="64px"
                />
            </div>

            {/* Tên + Giá */}
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm text-gray-600">{formatVnd(item.price)}</p>
            </div>

            {/* Quantity controls: − / qty / + */}
            <div className="flex items-center gap-1 border rounded px-2 py-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    aria-label="Giảm số lượng"
                >
                    −
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    aria-label="Tăng số lượng"
                >
                    +
                </Button>
            </div>

            {/* Nút xoá */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.productId)}
                aria-label="Xoá sản phẩm"
                className="text-red-600 hover:text-red-700"
            >
                🗑
            </Button>
        </div>
    );
}