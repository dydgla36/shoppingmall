import Link from "next/link";
import { products, STORE } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const steps = [
  { t: "상품 선택", d: "마음에 드는 옷을 골라 장바구니에 담아요." },
  { t: "장바구니·문의", d: "주문 내역을 확인하고 복사해요." },
  { t: "카톡·계좌로 확정", d: "카카오톡으로 보내고 입금하면 주문 완료예요." },
];

export default function Home() {
  return (
    <>
      <section className="flex min-h-[85vh] items-center bg-[#1a1a1a] text-white">
        <div className="wrap py-24">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">{STORE.name}</h1>
          <p className="mt-6 max-w-xl text-xl text-gray-300">{STORE.headline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">상품 보러가기</Link>
            <Link href="/order" className="btn border border-white text-white hover:bg-white hover:text-[#1a1a1a]">주문 문의</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">오래 입는 옷만 만들어요</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">{STORE.story}</p>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="best">
        <div className="wrap">
          <div className="flex items-end justify-between">
            <h2 id="best" className="text-3xl font-bold tracking-tight">대표 상품</h2>
            <Link href="/products" className="text-sm font-semibold text-brand hover:underline">전체 보기</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20" aria-labelledby="how">
        <div className="wrap">
          <h2 id="how" className="text-3xl font-bold tracking-tight">주문 방법</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="border-l-2 border-brand pl-4">
                <p className="font-semibold">{i + 1}. {s.t}</p>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
