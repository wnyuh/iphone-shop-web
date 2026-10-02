import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iPhone Shop",
  description: "Demo storefront phong cách Apple",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        {/* Header toàn trang dùng chung cho mọi trang */}
        <SiteHeader />

        {/* Nội dung riêng biệt của từng trang được render ở đây */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Footer toàn trang dùng chung cho mọi trang */}
        <SiteFooter />
      </body>
    </html>
  );
}
