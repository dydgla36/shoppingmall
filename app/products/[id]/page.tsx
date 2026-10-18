import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, won } from "@/lib/products";
import Placeholder from "@/components/Placeholder";
import ProductCard from "@/components/ProductCard";
import DetailActions from "@/components/DetailActions";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProduct(params.id);
  if (!p) return { title: "상품을 찾을 수 없어요 – gabby" };
  return { title: `${p.name} – gabby`, description: `${p.desc}. ${p.detail}`.slice(0, 150) };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const p = getProduct(params.id);
  if (!p) notFound();
  const others = products.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <div className="wrap py-12">
      <Link href="/products" className="text-sm text-gray-600 hover:text-brand">← 전체 상품</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Placeholder p={p} big />
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{p.name}</h1>
          <p className="mt-2 text-gray-600">{p.desc}</p>
          <p className="mt-6 text-2xl font-bold">{won(p.price)}</p>
          <p className="mt-6 leading-7 text-gray-600">{p.detail}</p>
          <DetailActions id={p.id} />
        </div>
      </div>
      <section className="mt-20" aria-labelledby="more">
        <h2 id="more" className="text-2xl font-bold tracking-tight">함께 보면 좋은 상품</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => <ProductCard key={o.id} p={o} />)}
        </div>
      </section>
    </div>
  );
}
