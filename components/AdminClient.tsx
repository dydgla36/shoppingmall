"use client";
import { useEffect, useState } from "react";
import { products, type Product } from "@/lib/products";

const KEY = "gabby-admin-draft";
const input = "w-full border border-gray-300 bg-white px-3 py-2 text-sm";

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

export default function AdminClient() {
  const [list, setList] = useState<Product[]>(products);
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setList(JSON.parse(raw) as Product[]);
    } catch {
      /* 초안이 깨져 있으면 현재 상품 목록으로 시작 */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(list));
    } catch {
      /* 저장 실패는 무시 */
    }
  }, [list, ready]);

  const flash = (t: string) => {
    setMsg(t);
    window.setTimeout(() => setMsg(""), 1600);
  };

  const update = <K extends keyof Product>(i: number, key: K, value: Product[K]) =>
    setList((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)));

  const addItem = () =>
    setList((prev) => [
      ...prev,
      { id: `item-${Date.now()}`, name: "새 상품", desc: "한 줄 설명", detail: "상세 설명을 입력하세요.", price: 10000, emoji: "👕", from: "#444b66", to: "#9aa3c7" },
    ]);

  const onCopy = async () => {
    await copyText(`export const products: Product[] = ${JSON.stringify(list, null, 2)};`);
    flash("코드를 복사했어요");
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {list.map((p, i) => (
          <li key={p.id} className="grid gap-3 py-5 md:grid-cols-[auto_1fr_auto]">
            <span className="flex h-20 w-16 items-center justify-center text-3xl" style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }} aria-hidden="true">{p.emoji}</span>
            <div className="grid gap-2">
              <input className={input} aria-label="상품명" value={p.name} onChange={(e) => update(i, "name", e.target.value)} />
              <input className={input} aria-label="한 줄 설명" value={p.desc} onChange={(e) => update(i, "desc", e.target.value)} />
              <textarea className={input} rows={3} aria-label="상세 설명" value={p.detail} onChange={(e) => update(i, "detail", e.target.value)} />
              <div className="flex flex-wrap items-center gap-2">
                <input className={`${input} !w-36`} type="number" min={0} aria-label="가격" value={p.price} onChange={(e) => update(i, "price", Math.max(0, Number(e.target.value) || 0))} />
                <input className={`${input} !w-20`} aria-label="이모지" value={p.emoji} onChange={(e) => update(i, "emoji", e.target.value)} />
                <input type="color" aria-label="그라데이션 시작 색" value={p.from} onChange={(e) => update(i, "from", e.target.value)} className="h-9 w-10" />
                <input type="color" aria-label="그라데이션 끝 색" value={p.to} onChange={(e) => update(i, "to", e.target.value)} className="h-9 w-10" />
              </div>
            </div>
            <button type="button" className="self-start text-sm text-gray-500 underline hover:text-brand" onClick={() => setList((prev) => prev.filter((_, idx) => idx !== i))}>삭제</button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={onCopy}>코드 복사</button>
        <button type="button" className="btn-outline" onClick={addItem}>상품 추가</button>
        <button type="button" className="btn-outline" onClick={() => { setList(products); flash("현재 사이트 상품으로 되돌렸어요"); }}>되돌리기</button>
        <span className="text-sm text-gray-600" aria-live="polite">{msg}</span>
      </div>
    </div>
  );
}
