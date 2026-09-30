// Nguồn duy nhất cho origin ảnh cho phép: next.config.ts (remotePatterns) và ProductImage đều đọc từ đây.
// Ảnh sản phẩm do Rails ActiveStorage phục vụ (Product#image_url = URL tuyệt đối tới Rails).
// Phải trùng APP_HOST bên Rails (mặc định 127.0.0.1:3000). Đổi ở đây rồi restart `npm run dev`.
export const IMAGE_ORIGIN = "http://127.0.0.1:3000";
