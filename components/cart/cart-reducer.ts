/**
 * components/cart/cart-reducer.ts
 * Quản lý trạng thái và logic tính toán giỏ hàng (Pure Reducer)
 */

// 1. Cấu trúc của một món hàng trong giỏ
export type CartItem = {
    productId: number;
    name: string;
    price: number; // Lưu dạng số để tính tổng tiền (Rails trả chuỗi, khi đưa vào giỏ cần ép sang Number)
    imageUrl: string | null;
    quantity: number;
};

// 2. Các hành động (lệnh) có thể tác động lên giỏ hàng
export type CartAction =
    | { type: "hydrate"; items: CartItem[] } // Nạp dữ liệu từ localStorage lúc mở trang
    | { type: "add"; item: Omit<CartItem, "quantity"> } // Thêm món (chưa cần kèm quantity, mặc định sẽ là 1)
    | { type: "setQuantity"; productId: number; quantity: number } // Đổi số lượng
    | { type: "remove"; productId: number } // Xoá món khỏi giỏ
    | { type: "clear" }; // Xoá sạch giỏ hàng

/**
 * 3. Hàm Reducer: Nhận vào giỏ hiện tại và hành động, trả về GIỎ HÀNG MỚI.
 * Luôn trả về mảng mới (immutability) để React nhận biết thay đổi và re-render giao diện.
 */
export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "hydrate":
            return action.items;

        case "add": {
            // Tìm xem món này đã có trong giỏ chưa
            const found = items.find((i) => i.productId === action.item.productId);

            if (found) {
                // Đã có: duyệt qua mảng, tăng quantity của món đó lên 1, các món khác giữ nguyên
                return items.map((i) =>
                    i.productId === found.productId ? { ...i, quantity: i.quantity + 1 } : i
                );
            }

            // Chưa có: tạo mảng mới gồm các món cũ + món mới với số lượng là 1
            return [...items, { ...action.item, quantity: 1 }];
        }

        case "setQuantity":
            // Nếu số lượng chỉnh về 0 hoặc số âm: tự động loại bỏ món đó ra khỏi giỏ
            if (action.quantity <= 0) {
                return items.filter((i) => i.productId !== action.productId);
            }
            // Ngược lại thì cập nhật số lượng mới
            return items.map((i) =>
                i.productId === action.productId ? { ...i, quantity: action.quantity } : i
            );

        case "remove":
            // Lọc bỏ sản phẩm có productId tương ứng
            return items.filter((i) => i.productId !== action.productId);

        case "clear":
            // Xoá trắng
            return [];

        default:
            return items;
    }
}

/**
 * 4. Hàm làm sạch dữ liệu (Sanitizer):
 * Dữ liệu đọc từ localStorage có thể bị hỏng hoặc người dùng F12 sửa linh tinh.
 * Hàm này kiểm tra từng item xem có đúng định dạng không, loại bỏ item rác.
 */
export function sanitizeCartItems(raw: unknown): CartItem[] {
    if (!Array.isArray(raw)) return [];

    return raw
        .filter(
            (i): i is CartItem =>
                !!i &&
                typeof i === "object" &&
                typeof (i as CartItem).productId === "number" &&
                typeof (i as CartItem).name === "string" &&
                typeof (i as CartItem).price === "number" &&
                Number.isFinite((i as CartItem).price) &&
                ((i as CartItem).imageUrl === null || typeof (i as CartItem).imageUrl === "string") &&
                typeof (i as CartItem).quantity === "number" &&
                Number.isFinite((i as CartItem).quantity)
        )
        .map((i) => ({
            ...i,
            // Đảm bảo số lượng luôn là số nguyên >= 1
            quantity: Math.max(1, Math.round(i.quantity)),
        }));
}
