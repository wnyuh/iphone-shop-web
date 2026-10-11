"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CirclePlus, Info, ShieldPlus, Truck } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/components/cart/cart-reducer";
import { CheckoutButton, Divider, InstallmentNote, LinkButton, Section, formatVND, installmentOf, linkClass } from "./ui";

const CARE_PRICE = 6_099_000;
const CARE_PERKS = [
    "Bảo hành mở rộng và hỗ trợ ưu tiên 24/7",
    "Sửa chữa hư hỏng do tai nạn với mức phí cố định",
    "Thay pin miễn phí khi dung lượng pin dưới 80%",
    "Hỗ trợ trực tiếp từ chuyên gia Apple",
];
const MIN_QUANTITY_OPTIONS = 10;

type Line = { item: CartItem; hasCare: boolean; total: number; downPayment: number; monthly: number };

const perMonth = (amount: number) => `${formatVND(amount)}/tháng*`;

function QuantitySelect({ value, onChange }: { value: number; onChange: (value: number) => void }) {
    const options = Array.from({ length: Math.max(MIN_QUANTITY_OPTIONS, value) }, (_, i) => i + 1);
    return (
        <label className="relative inline-flex w-fit items-center">
            <span className="sr-only">Số lượng</span>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="appearance-none rounded-lg border border-[#d2d2d7] bg-white py-2 pl-3 pr-8 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            >
                {options.map((n) => (
                    <option key={n}>{n}</option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 size-4 text-[#6e6e73]" />
        </label>
    );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
    return (
        <div className={`flex justify-between gap-4 ${strong ? "font-semibold" : ""}`}>
            <dt>{label}</dt>
            <dd className="text-right">{value}</dd>
        </div>
    );
}

function CartLineView({ line, onToggleCare }: { line: Line; onToggleCare: () => void }) {
    const { setQuantity, removeItem } = useCart();
    const { item, hasCare, total, downPayment, monthly } = line;
    const isIphone = item.name.startsWith("iPhone");

    return (
        <article className="flex gap-5 py-10 md:gap-10">
            <div className="w-24 shrink-0 md:w-40">
                <ProductImage src={item.imageUrl} alt={item.name} sizes="160px" fit="contain" priority />
            </div>

            <div className="min-w-0 flex-1 space-y-8">
                <div className="grid grid-cols-2 items-baseline gap-x-6 gap-y-3 md:grid-cols-[1fr_5rem_9rem]">
                    <h2 className="col-span-full text-xl font-semibold md:col-span-1 md:text-2xl">
                        <Link href={`/products/${item.productId}`}>{item.name}</Link>
                    </h2>
                    <QuantitySelect value={item.quantity} onChange={(q) => setQuantity(item.productId, q)} />
                    <p className="text-right text-lg font-semibold">{formatVND(total)}</p>

                    <InstallmentNote downPayment={downPayment} className="col-span-full text-sm text-[#6e6e73] md:col-span-2" />
                    <p className="col-span-full text-sm font-semibold md:col-span-1 md:text-right">{perMonth(monthly)}</p>

                    <LinkButton onClick={() => removeItem(item.productId)} className="col-span-full justify-self-start text-sm md:col-start-3 md:justify-self-end">
                        Xóa
                    </LinkButton>
                </div>

                {isIphone && (
                    <div className="flex gap-4">
                        <ShieldPlus className="size-9 shrink-0 text-[#0071e3]" strokeWidth={1.5} />
                        <div className="space-y-3 text-sm">
                            <p className="font-semibold">
                                Thêm AppleCare+ cho {item.name} cho mức giá {formatVND(CARE_PRICE)}{" "}
                                <LinkButton onClick={onToggleCare} className="font-normal">
                                    {hasCare ? "Bỏ" : "Thêm"}
                                </LinkButton>
                            </p>
                            <ul className="list-disc space-y-1 pl-5 text-[#6e6e73]">
                                {CARE_PERKS.map((perk) => (
                                    <li key={perk}>{perk}</li>
                                ))}
                            </ul>
                            <Link href="#" className={`${linkClass} inline-flex items-center gap-1`}>
                                Tìm hiểu thêm <CirclePlus className="size-3.5" />
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 text-sm">
                    <div className="flex gap-3">
                        <Truck className="size-5 shrink-0" strokeWidth={1.5} />
                        <p>
                            <span className="font-semibold">Đặt hàng trước 3:00 chiều.</span> Giao hàng đến:{" "}
                            <span className={`${linkClass} inline-flex items-center gap-1`}>
                                Thành Phố Hồ Chí Minh <Info className="size-3.5" />
                            </span>
                        </p>
                    </div>
                    <p className="font-semibold">Th 2 12/10/2026 — Miễn Phí</p>
                </div>
            </div>
        </article>
    );
}

export function CartView() {
    const { items, hydrated } = useCart();
    const [careIds, setCareIds] = useState<Record<number, boolean>>({});

    if (!hydrated) return <div className="min-h-[60vh]" />;

    const lines: Line[] = items.map((item) => {
        const hasCare = !!careIds[item.productId];
        const unit = item.price + (hasCare ? CARE_PRICE : 0);
        const { downPayment, monthly } = installmentOf(unit);
        return { item, hasCare, total: unit * item.quantity, downPayment: downPayment * item.quantity, monthly: monthly * item.quantity };
    });
    const sum = (key: "total" | "downPayment" | "monthly") => lines.reduce((acc, l) => acc + l[key], 0);
    const total = sum("total");

    if (items.length === 0) {
        return (
            <Section className="py-24 text-center">
                <h1 className="text-4xl font-semibold tracking-tight">Giỏ hàng của bạn đang trống.</h1>
                <Link href="/store" className={`${linkClass} mt-4 inline-block text-lg`}>
                    Tiếp tục mua sắm
                </Link>
            </Section>
        );
    }

    return (
        <>
            <Section className="pt-6 text-center">
                <p className="text-xs text-[#6e6e73]">
                    Xin lưu ý rằng chúng tôi không chấp nhận đổi trả đối với các đơn hàng trực tuyến.
                </p>
                <h1 className="mx-auto mt-12 max-w-2xl text-[32px] font-semibold leading-tight tracking-tight md:text-[40px]">
                    Tổng giá trị giỏ hàng của bạn là {formatVND(total)}.
                </h1>
                <p className="mt-3 text-sm text-[#6e6e73]">Vận chuyển miễn phí đối với mọi đơn hàng.</p>
                <CheckoutButton className="mt-8 min-w-48" />
                <Divider className="mt-12" />
            </Section>

            <Section className="pb-10">
                <div className="divide-y divide-[#d2d2d7]/70">
                    {lines.map((line) => (
                        <CartLineView
                            key={line.item.productId}
                            line={line}
                            onToggleCare={() => setCareIds((ids) => ({ ...ids, [line.item.productId]: !ids[line.item.productId] }))}
                        />
                    ))}
                </div>

                <Divider />

                <dl className="ml-auto mt-8 max-w-sm space-y-3 text-sm">
                    <SummaryRow label="Tổng phụ" value={formatVND(total)} />
                    <SummaryRow label="Vận chuyển" value="MIỄN PHÍ" />
                    <Divider className="!my-5" />
                    <SummaryRow label="Thanh toán toàn bộ" value={formatVND(total)} strong />
                    <p className="text-center text-xs text-[#6e6e73]">hoặc</p>
                    <SummaryRow label="Thanh Toán Hàng Tháng" value={perMonth(sum("monthly"))} strong />
                    <InstallmentNote downPayment={sum("downPayment")} className="text-xs text-[#6e6e73]" />
                    <Link href="#" className={`${linkClass} block text-xs`}>
                        Khám phá thêm các lựa chọn trả góp hàng tháng &gt;
                    </Link>
                    <CheckoutButton className="!mt-6 w-full py-4" />
                </dl>
            </Section>
        </>
    );
}
