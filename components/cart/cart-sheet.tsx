"use client";

import { useCart } from "./cart-provider";
import { CartLineItem } from "./cart-line-item";
import { formatVnd } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";

export function CartSheet() {
    const { items, totalQuantity, totalPrice, isOpen, setOpen } = useCart();

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            {/* Trigger: Button ở Header */}
            <SheetTrigger
                render={<Button variant="ghost" size="icon" aria-label="Giỏ hàng" className="relative" />}
            >
                <ShoppingBag className="size-5" />
                {totalQuantity > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {totalQuantity > 99 ? "99+" : totalQuantity}
                    </span>
                )}
            </SheetTrigger>

            {/* Drawer Content */}
            <SheetContent className="flex flex-col w-80 sm:w-96">
                <SheetHeader>
                    <SheetTitle>Giỏ hàng</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 py-10">
                        Giỏ hàng của bạn đang trống.
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                        {items.map((item) => (
                            <CartLineItem key={item.productId} item={item} />
                        ))}
                    </div>
                )}

                <SheetFooter className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg mb-4">
                        <span>Tổng cộng</span>
                        <span>{formatVnd(totalPrice)}</span>
                    </div>
                    {items.length === 0 ? (
                        <Button disabled className="w-full">Thanh toán</Button>
                    ) : (
                        <Button
                            nativeButton={false}
                            render={<Link href="/cart" onClick={() => setOpen(false)} />}
                            className="w-full"
                        >
                            Xem giỏ hàng
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}