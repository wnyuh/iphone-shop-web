"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import type { Product } from "@/lib/api";
import { cartReducer, sanitizeCartItems, type CartItem } from "./cart-reducer";

const STORAGE_KEY = "cart:v1";

type CartContextValue = {
    items: CartItem[];
    hydrated: boolean;
    totalQuantity: number;
    totalPrice: number;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    addItem: (product: Product) => void;
    setQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, []);
    const [hydrated, setHydrated] = useState(false);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
            dispatch({ type: "hydrate", items: sanitizeCartItems(saved) });
        } catch { }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, hydrated]);

    useEffect(() => {
        function onStorage(e: StorageEvent) {
            if (e.key !== STORAGE_KEY) return;
            try { dispatch({ type: "hydrate", items: sanitizeCartItems(JSON.parse(e.newValue ?? "[]")) }); }
            catch { }
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const value: CartContextValue = {
        items,
        hydrated,
        isOpen,
        setOpen,
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