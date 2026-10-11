import { CartView } from "@/components/cart-page/cart-view";
import { Recommendations } from "@/components/cart-page/recommendations";
import { PromoBanner, PurchaseFaq } from "@/components/cart-page/promo-and-faq";
import { getProducts } from "@/lib/get-products";

export const metadata = {
  title: "Giỏ Hàng - Apple Store",
  description: "Xem lại giỏ hàng và tiến hành thanh toán.",
};

export default async function CartPage() {
  const products = await getProducts();
  const accessories = products.filter((p) => p.category === "accessories");
  const featured = products.find((p) => p.name === "AirPods Pro") ?? products[0];

  return (
    <main className="bg-white text-[#1d1d1f]">
      <CartView />
      <Recommendations products={accessories} />
      {featured && <PromoBanner product={featured} />}
      <PurchaseFaq />
    </main>
  );
}
