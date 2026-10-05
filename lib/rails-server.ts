// CHỈ dùng ở server (Route Handler, Server Component). Không import từ client component.
const RAILS_API_URL = process.env.RAILS_API_URL ?? "http://127.0.0.1:3000";

export function railsFetch(path: string, init?: RequestInit): Promise<Response> {
  // no-store: luôn lấy dữ liệu mới, tránh cache của fetch trong Next
  // timeout 5s: Rails treo thì request không bị chờ vô thời hạn
  // ...init: cho phép truyền thêm method (POST/DELETE), headers (JSON, Bearer token), body
  return fetch(`${RAILS_API_URL}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
    ...init,
  });
}
