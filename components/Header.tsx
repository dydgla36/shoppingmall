"use client";
import Link from "next/link";
import { useState } from "react";
import CartBadge from "./CartBadge";
import { STORE } from "@/lib/products";

const links = [
  { href: "/products", label: "상품" },
  { href: "/order", label: "주문 문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight" onClick={() => setOpen(false)}>
          {STORE.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="주요 메뉴">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-brand">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <CartBadge />
          <button
            type="button"
            className="p-2 md:hidden"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-gray-200 bg-white md:hidden" aria-label="모바일 메뉴">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="wrap block py-4 text-sm font-medium">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
