// Nguồn duy nhất cho host ảnh cho phép: next.config.ts (remotePatterns) và ProductImage đều đọc từ đây.
// Thêm host mới ở đây rồi restart `npm run dev`. Wildcard của remotePatterns không khớp "encrypted-tbn*" nên liệt kê từng host.
export const ALLOWED_IMAGE_HOSTS = [
  "encrypted-tbn0.gstatic.com",
  "encrypted-tbn1.gstatic.com",
  "encrypted-tbn3.gstatic.com",
  "bizweb.dktcdn.net",
];
