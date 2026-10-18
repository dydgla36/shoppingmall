"use client";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function DetailActions({ id }: { id: string }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">수량</span>
        <div className="flex items-center border border-gray-300">
          <button type="button" aria-label="수량 줄이기" className="h-10 w-10 hover:bg-gray-100" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="w-10 text-center text-sm font-semibold" aria-live="polite">{qty}</span>
          <button type="button" aria-label="수량 늘리기" className="h-10 w-10 hover:bg-gray-100" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <AddToCartButton id={id} qty={qty} label="장바구니 담기" primary />
        <Link href="/order" className="btn-outline">바로 주문 문의</Link>
      </div>
    </div>
  );
}
