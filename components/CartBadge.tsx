"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartBadge() {
  const { count } = useCart();
  return (
    <Link href="/order" aria-label={`장바구니, ${count}개`} className="relative p-2 hover:text-brand">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 8h14l-1 12H6L5 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center bg-brand px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
