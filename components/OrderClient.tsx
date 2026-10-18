"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, won, STORE } from "@/lib/products";

function copyText(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(text).catch(() => fallback(text));
  }
  return fallback(text);
}
function fallback(text: string): Promise<void> {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  return Promise.resolve();
}

export default function OrderClient() {
  const { items, total, setQty, remove } = useCart();
  const [copied, setCopied] = useState(false);

  const lines = items.flatMap((i) => {
    const p = getProduct(i.id);
    return p ? [{ p, qty: i.qty }] : [];
  });

  const onCopy = async () => {
    const text = [
      `[${STORE.name} 주문 내역]`,
      ...lines.map(({ p, qty }) => `- ${p.name} x ${qty} = ${won(p.price * qty)}`),
      `합계: ${won(total)}`,
      "입금자명: ",
    ].join("\n");
    await copyText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const kakaoReady = STORE.kakao.startsWith("http");

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <section aria-labelledby="cart-title">
        <h2 id="cart-title" className="text-xl font-bold">장바구니</h2>
        {lines.length === 0 ? (
          <div className="mt-6 border border-dashed border-gray-300 p-10 text-center">
            <p className="text-gray-600">아직 담은 상품이 없어요.</p>
            <Link href="/products" className="btn-primary mt-4">상품 보러가기</Link>
          </div>
        ) : (
          <>
            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="flex flex-wrap items-center gap-4 py-4">
                  <span className="flex h-16 w-14 items-center justify-center text-3xl" style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }} aria-hidden="true">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${p.id}`} className="font-semibold hover:text-brand">{p.name}</Link>
                    <p className="text-sm text-gray-600">{won(p.price)}</p>
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <button type="button" aria-label={`${p.name} 수량 줄이기`} className="h-9 w-9 hover:bg-gray-100" onClick={() => setQty(p.id, qty - 1)}>−</button>
                    <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                    <button type="button" aria-label={`${p.name} 수량 늘리기`} className="h-9 w-9 hover:bg-gray-100" onClick={() => setQty(p.id, qty + 1)}>+</button>
                  </div>
                  <span className="w-24 text-right font-semibold">{won(p.price * qty)}</span>
                  <button type="button" className="text-sm text-gray-500 underline hover:text-brand" onClick={() => remove(p.id)}>삭제</button>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center justify-between text-lg font-bold">
              <span>합계</span><span>{won(total)}</span>
            </p>
            <button type="button" onClick={onCopy} className="btn-outline mt-4 w-full sm:w-auto">
              {copied ? "복사했어요" : "주문 내역 복사하기"}
            </button>
          </>
        )}
      </section>

      <aside aria-labelledby="how-title" className="h-fit space-y-6 bg-gray-50 p-6">
        <h2 id="how-title" className="text-xl font-bold">주문은 이렇게 해요</h2>
        <div>
          <p className="text-sm font-semibold">1. 카카오톡으로 주문하기</p>
          <p className="mt-1 text-sm text-gray-600">복사한 주문 내역을 붙여넣어 보내주세요.</p>
          {kakaoReady ? (
            <a href={STORE.kakao} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 w-full">카카오톡으로 주문하기</a>
          ) : (
            <button type="button" className="btn-primary mt-3 w-full" onClick={() => window.alert("카카오톡 채널을 준비 중이에요. 전화나 문자로 먼저 문의해 주세요.")}>
              카카오톡으로 주문하기
            </button>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">2. 계좌이체</p>
          <p className="mt-1 text-sm text-gray-600">{STORE.bank} {STORE.account} (예금주 {STORE.holder})</p>
          <p className="mt-1 text-sm text-gray-600">입금 후 카톡으로 입금자명을 알려주세요.</p>
        </div>
        <div>
          <p className="text-sm font-semibold">3. 전화·문자</p>
          <a href={`tel:${STORE.phone}`} className="mt-1 block text-sm text-brand underline">{STORE.phone}</a>
        </div>
      </aside>
    </div>
  );
}
