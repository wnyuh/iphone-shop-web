import type { ComponentProps } from "react";
import { cn } from "cn";

export const formatVND = (amount: number) => `${amount.toLocaleString("vi-VN")}đ`;

export const linkClass = "text-[#0066cc] hover:underline cursor-pointer";

export function CheckoutButton({ className, children = "Thanh Toán", ...props }: ComponentProps<"button">) {
    return (
        <button
            type="button"
            className={cn(
                "rounded-lg bg-[#0071e3] px-8 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0077ed] active:bg-[#006edb] cursor-pointer",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export function LinkButton({ className, ...props }: ComponentProps<"button">) {
    return <button type="button" className={cn(linkClass, className)} {...props} />;
}

export function Divider({ className }: { className?: string }) {
    return <hr className={cn("border-[#d2d2d7]/70", className)} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
    return <section className={cn("mx-auto w-full max-w-[980px] px-4 sm:px-6", className)} {...props} />;
}

const DOWN_PAYMENT_RATE = 0.2;
const SERVICE_FEE_RATE = 0.0167;
const INSTALLMENT_MONTHS = 24;
const roundToThousand = (n: number) => Math.round(n / 1000) * 1000;

export function installmentOf(price: number) {
    const downPayment = roundToThousand(price * DOWN_PAYMENT_RATE);
    const monthly = roundToThousand(((price - downPayment) * (1 + SERVICE_FEE_RATE)) / INSTALLMENT_MONTHS);
    return { downPayment, monthly };
}

export function InstallmentNote({ downPayment, className }: { downPayment: number; className?: string }) {
    return (
        <p className={className}>
            Thanh toán phí dịch vụ 1.67% trong 24 tháng sau khi thanh toán lần đầu 20% là {formatVND(downPayment)}.
        </p>
    );
}
