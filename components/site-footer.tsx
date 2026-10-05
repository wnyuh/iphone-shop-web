import React from "react";
import Link from "next/link";

/**
 * Chân trang toàn trang (SiteFooter):
 * Chứa đoạn text lưu ý, hệ thống Sitemap 5 cột, bản quyền và chính sách.
 * Dùng chung cho toàn bộ website thông qua app/layout.tsx.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-[12px] leading-relaxed pt-8 pb-12 border-t border-neutral-300 mt-auto">
      <div className="max-w-[1024px] mx-auto px-4 space-y-4">
        {/* Đoạn text lưu ý nhỏ bên trên */}
        <div className="space-y-2 border-b border-neutral-300/70 pb-6 text-[11px] text-[#86868b]">
          <p>
            1. Giá được hiển thị đã bao gồm thuế GTGT. Chương trình trả góp 0% lãi suất với kỳ hạn tối đa 24 tháng khi thanh toán qua thẻ tín dụng hợp lệ của các ngân hàng đối tác.
          </p>
          <p>
            2. Apple TV+ yêu cầu đăng ký thuê bao. Nội dung có thể thay đổi tùy theo khu vực và quốc gia.
          </p>
          <p>
            3. Tính năng đo điện tâm đồ và cảm biến nhịp tim không phải là thiết bị y tế chuyên dụng và chỉ nhằm mục đích theo dõi sức khỏe cá nhân.
          </p>
        </div>

        {/* Hệ thống lưới Sitemap nhiều cột */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-4 text-[12px]">
          {/* Cột 1: Mua Sắm Và Tìm Hiểu */}
          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900">Mua Sắm Và Tìm Hiểu</h5>
            <ul className="space-y-1.5">
              <li><Link href="/" className="hover:text-neutral-900">Cửa Hàng</Link></li>
              <li><Link href="#mac" className="hover:text-neutral-900">Mac</Link></li>
              <li><Link href="#ipad" className="hover:text-neutral-900">iPad</Link></li>
              <li><Link href="#iphone" className="hover:text-neutral-900">iPhone</Link></li>
              <li><Link href="#watch" className="hover:text-neutral-900">Watch</Link></li>
              <li><Link href="#airpods" className="hover:text-neutral-900">AirPods</Link></li>
              <li><Link href="#tv-home" className="hover:text-neutral-900">TV & Nhà</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">AirTag</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Phụ Kiện</Link></li>
            </ul>
          </div>

          {/* Cột 2: Tài Khoản & Giải Trí */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Tài Khoản</h5>
              <ul className="space-y-1.5">
                <li><Link href="/login" className="hover:text-neutral-900">Quản Lý Tài Khoản</Link></li>
                <li><Link href="/login" className="hover:text-neutral-900">Tài Khoản Store</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">iCloud.com</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Giải Trí</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Apple One</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Apple TV+</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Apple Music</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Apple Arcade</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Apple Podcasts</Link></li>
              </ul>
            </div>
          </div>

          {/* Cột 3: Apple Store */}
          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900">Apple Store</h5>
            <ul className="space-y-1.5">
              <li><Link href="#" className="hover:text-neutral-900">Tìm Cửa Hàng</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Genius Bar</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Today at Apple</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Trại Hè Apple</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Ứng Dụng Apple Store</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Thanh Toán Được Chấp Nhận</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Tình Trạng Đơn Hàng</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Trợ Giúp Mua Hàng</Link></li>
            </ul>
          </div>

          {/* Cột 4: Doanh Nghiệp & Giáo Dục */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Dành Cho Doanh Nghiệp</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Apple Và Doanh Nghiệp</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Mua Sắm Cho Doanh Nghiệp</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Dành Cho Giáo Dục</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Apple Và Giáo Dục</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Mua Hàng Cho Bậc Đại Học</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Chăm Sóc Sức Khỏe</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Apple Trong Y Tế</Link></li>
              </ul>
            </div>
          </div>

          {/* Cột 5: Giá Trị & Về Apple */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Giá Trị Cốt Lõi</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Trợ Năng</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Môi Trường</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Quyền Riêng Tư</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Trách Nhiệm Nhà Cung Cấp</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-neutral-900">Về Apple</h5>
              <ul className="space-y-1.5">
                <li><Link href="#" className="hover:text-neutral-900">Trang Tin Tức</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Lãnh Đạo Của Apple</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Cơ Hội Nghề Nghiệp</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Nhà Đầu Tư</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Đạo Đức & Tuân Thủ</Link></li>
                <li><Link href="#" className="hover:text-neutral-900">Liên Hệ Apple</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dòng phân cách & Bản quyền & Chính sách */}
        <div className="pt-6 border-t border-neutral-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Bản quyền © 2026 Apple Inc. Bảo lưu mọi quyền.</span>
            <div className="flex flex-wrap items-center gap-x-3 text-neutral-600">
              <Link href="#" className="hover:underline">Chính Sách Quyền Riêng Tư</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Điều Khoản Sử Dụng</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Bán Hàng Và Hoàn Tiền</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Pháp Lý</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Sơ Đồ Trang Web</Link>
            </div>
          </div>

          <div className="text-neutral-700 font-medium">Việt Nam</div>
        </div>

        {/* Thông tin công ty & giấy phép kinh doanh ở tận cùng bên dưới */}
        <div className="pt-2 text-[10px] text-neutral-400 space-y-0.5">
          <p>Công ty TNHH Apple Việt Nam | Giấy chứng nhận ĐKDN số: 0313506308 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp.</p>
          <p>Địa chỉ: Phòng 901, Tầng 9, Tòa nhà Ngôi Nhà Đức tại TP. Hồ Chí Minh, số 33 đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam.</p>
          <p>Điện thoại: 1800 1192 | Email: contactus@apple.com</p>
        </div>
      </div>
    </footer>
  );
}
