import type { NextConfig } from "next";
import { IMAGE_ORIGIN } from "./lib/image-hosts";

const { protocol, hostname, port } = new URL(IMAGE_ORIGIN);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: protocol.replace(":", "") as "http" | "https", hostname, port }],
    // Next 16 chặn tải ảnh từ IP nội bộ (127.0.0.1) mặc định. Chỉ bật cho demo local, KHÔNG deploy nguyên trạng.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
