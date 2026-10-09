"use client";

import { createContext, useContext, useReducer } from "react";
import type { Product } from "@/lib/api";
import { cartReducer, type CartItem } from "./cart-reducer";

type CartContextValue = {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    addItem: (product: Product) => void;
    setQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, []);

    const value: CartContextValue = {
        items,
        totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        addItem: (product) =>
            dispatch({
                type: "add",
                item: {
                    productId: product.id,
                    name: product.name,
                    price: Number(product.price),
                    imageUrl: product.image_url,
                },
            }),
        setQuantity: (productId, quantity) =>
            dispatch({ type: "setQuantity", productId, quantity }),
        removeItem: (productId) => dispatch({ type: "remove", productId }),
        clear: () => dispatch({ type: "clear" }),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart phải nằm trong <CartProvider>");
    return ctx;
}