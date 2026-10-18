import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "전체 상품 – gabby",
  description: "gabby의 코트, 티셔츠, 데님, 니트, 에코백을 한눈에 볼 수 있어요.",
};

export default function ProductsPage() {
  return (
    <section className="wrap py-16">
      <h1 className="text-4xl font-bold tracking-tight">전체 상품</h1>
      <p className="mt-3 text-gray-600">총 {products.length}개 상품</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
