"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import type { Product } from "@/lib/api";
import { cartReducer, sanitizeCartItems, type CartItem } from "./cart-reducer";

const STORAGE_KEY = "cart:v1";

// Những gì component bên ngoài được phép dùng từ giỏ hàng
type CartContextValue = {
    items: CartItem[];
    hydrated: boolean;
    totalQuantity: number; // tổng số cái (dùng cho badge)
    totalPrice: number; // tổng tiền
    addItem: (product: Product) => void;
    setQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
};

// "Sảnh để xe đẩy": ban đầu chưa có xe nên là null
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    // items = giỏ hiện tại, dispatch = cách "ra lệnh" cho reducer
    const [items, dispatch] = useReducer(cartReducer, []);
    const [hydrated, setHydrated] = useState(false);

    // Effect 1: HYDRATE - Lấy giỏ từ localStorage ra. Chỉ chạy 1 lần sau khi trang hiện
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
            dispatch({ type: "hydrate", items: sanitizeCartItems(saved) }); // lọc item rác trước khi nạp
        } catch {
            // Dữ liệu hỏng (vd "abc") → bỏ qua, giữ giỏ rỗng
        }
        // Đọc localStorage (hệ thống bên ngoài) chỉ làm được sau mount nên bắt buộc set state trong effect
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHydrated(true); // luôn bật cờ, kể cả khi đọc lỗi
    }, []);

    // Effect 2: PERSIST - Cất giỏ vào localStorage mỗi khi giỏ đổi
    useEffect(() => {
        // KHÔNG lưu trước khi hydrate xong, nếu không [] sẽ ghi đè giỏ cũ
        if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, hydrated]);

    // Effect 3: CROSS-TAB SYNC - Đồng bộ giỏ giữa các tab (vd mở sản phẩm bằng ctrl/middle-click)
    useEffect(() => {
        function onStorage(e: StorageEvent) {
            if (e.key !== STORAGE_KEY) return;
            try { dispatch({ type: "hydrate", items: sanitizeCartItems(JSON.parse(e.newValue ?? "[]")) }); }
            catch { /* giá trị hỏng từ tab kia → bỏ qua, giữ state hiện tại */ }
        }
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const value: CartContextValue = {
        items,
        hydrated,
        // Dữ liệu dẫn xuất: tính từ items, không lưu state riêng
        totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),

        // Đổi Product (từ Rails) → CartItem (của giỏ) rồi gửi lệnh "add"
        addItem: (product) =>
            dispatch({
                type: "add",
                item: {
                    productId: product.id,
                    name: product.name,
                    price: Number(product.price), // chuỗi → số, tránh nối chuỗi khi cộng
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

// "Tấm thẻ lấy xe": component nào cần giỏ thì gọi useCart()
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart phải nằm trong <CartProvider>");
    return ctx;
}
