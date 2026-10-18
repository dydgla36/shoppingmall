import type { Metadata } from "next";
import OrderClient from "@/components/OrderClient";

export const metadata: Metadata = {
  title: "장바구니·주문 문의 – gabby",
  description: "담은 상품을 확인하고 카카오톡, 계좌이체, 전화로 주문하는 방법을 안내해요.",
};

export default function OrderPage() {
  return (
    <section className="wrap py-16">
      <h1 className="text-4xl font-bold tracking-tight">장바구니·주문 문의</h1>
      <div className="mt-10">
        <OrderClient />
      </div>
    </section>
  );
}
