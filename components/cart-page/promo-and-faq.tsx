import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import type { Product } from "@/lib/api";
import { Divider, Section, linkClass } from "./ui";

const FAQS = [
    { q: "Tôi có thể thay đổi hoặc hủy đơn hàng không?", a: "Bạn có thể thay đổi hoặc hủy đơn hàng trước khi đơn được chuyển cho đơn vị vận chuyển. Vui lòng liên hệ bộ phận hỗ trợ càng sớm càng tốt." },
    { q: "Vận chuyển và giao hàng hoạt động như thế nào?", a: "Mọi đơn hàng đều được vận chuyển miễn phí. Đơn đặt trước 3:00 chiều sẽ được xử lý trong ngày." },
    { q: "Các hình thức thanh toán được chấp nhận?", a: "Chúng tôi chấp nhận thẻ tín dụng, thẻ ghi nợ nội địa, chuyển khoản ngân hàng và trả góp qua các ngân hàng đối tác." },
    { q: "Chính sách đổi trả đối với đơn hàng trực tuyến?", a: "Các đơn hàng trực tuyến không được chấp nhận đổi trả. Sản phẩm lỗi do nhà sản xuất vẫn được bảo hành chính hãng." },
];

export function PromoBanner({ product }: { product: Product }) {
    return (
        <Section>
            <div className="flex items-center justify-between gap-6 overflow-hidden rounded-2xl bg-[#f5f5f7] pl-8 pr-4 md:pl-12">
                <div className="space-y-1 py-6">
                    <p className="text-xs font-semibold uppercase text-[#bf4800]">Sản Phẩm Mới</p>
                    <p className="text-xl font-semibold md:text-2xl">{product.name}</p>
                    {product.description && <p className="max-w-md text-sm text-[#6e6e73]">{product.description}</p>}
                    <Link href={`/products/${product.id}`} className={`${linkClass} inline-block pt-1 text-sm`}>Mua &gt;</Link>
                </div>
                <div className="w-28 shrink-0 md:w-44">
                    <ProductImage src={product.image_url} alt={product.name} sizes="176px" fit="contain" />
                </div>
            </div>
        </Section>
    );
}

export function PurchaseFaq() {
    return (
        <Section className="py-12">
            <Divider />
            <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-xl font-semibold [&::-webkit-details-marker]:hidden">
                    Thắc Mắc Về Việc Mua Hàng
                    <ChevronDown className="size-5 text-[#6e6e73] transition-transform group-open:rotate-180" />
                </summary>
                <dl className="grid gap-x-10 gap-y-6 pb-6 text-sm md:grid-cols-2">
                    {FAQS.map(({ q, a }) => (
                        <div key={q} className="space-y-1">
                            <dt className="font-semibold">{q}</dt>
                            <dd className="text-[#6e6e73]">{a}</dd>
                        </div>
                    ))}
                </dl>
            </details>
            <Divider />
        </Section>
    );
}
