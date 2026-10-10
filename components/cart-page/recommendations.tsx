"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/lib/api";
import { CheckoutButton, LinkButton, Section, formatVND } from "./ui";

// API chưa có dữ liệu màu → chỉ khai báo cho các sản phẩm thực tế có nhiều màu
const COLOR_OPTIONS: Record<string, string[]> = {
    "Tai nghe Beats": ["#1d1d1f", "#d9534f", "#f5f5f7"],
    "Magic Keyboard": ["#f5f5f7", "#1d1d1f"],
};
const INITIAL_COUNT = 3;

function SuggestionCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const colors = COLOR_OPTIONS[product.name] ?? [];

    return (
        <li className="flex flex-col text-center">
            <ProductImage src={product.image_url} alt={product.name} sizes="(min-width: 768px) 300px, 50vw" fit="contain" />
            <h3 className="mt-5 text-[15px] font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-[#6e6e73]">{formatVND(Number(product.price))}</p>
            <div className="mt-3 flex min-h-5 justify-center gap-3">
                {colors.map((color, i) => (
                    <label key={color} className="cursor-pointer">
                        <input type="radio" name={`color-${product.id}`} defaultChecked={i === 0} className="peer sr-only" />
                        <span
                            style={{ backgroundColor: color }}
                            className="block size-4 rounded-full border border-black/15 ring-[#0071e3] ring-offset-2 peer-checked:ring-2 peer-focus-visible:ring-2"
                        />
                    </label>
                ))}
            </div>
            <CheckoutButton onClick={() => addItem(product)} className="mx-auto mt-auto !px-5 !py-2 !text-sm">
                Thêm vào giỏ hàng
            </CheckoutButton>
        </li>
    );
}

export function Recommendations({ products }: { products: Product[] }) {
    const { items } = useCart();
    const [expanded, setExpanded] = useState(false);

    const available = products.filter((p) => !items.some((i) => i.productId === p.id));
    if (available.length === 0) return null;
    const visible = expanded ? available : available.slice(0, INITIAL_COUNT);

    return (
        <Section className="py-16 text-center">
            <h2 className="text-[28px] font-semibold tracking-tight">Có thể bạn cũng sẽ thích</h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
                {visible.map((product) => (
                    <SuggestionCard key={product.id} product={product} />
                ))}
            </ul>
            {!expanded && available.length > INITIAL_COUNT && (
                <LinkButton onClick={() => setExpanded(true)} className="mt-10 inline-flex items-center gap-1 text-sm">
                    Hiển thị thêm sản phẩm <ChevronDown className="size-4" />
                </LinkButton>
            )}
        </Section>
    );
}
