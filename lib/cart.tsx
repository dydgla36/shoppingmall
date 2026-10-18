"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "./products";

type Item = { id: string; qty: number };
type CartCtx = {
  items: Item[];
  count: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "gabby-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as Item[]);
    } catch {
      /* 저장값이 깨져 있으면 빈 장바구니로 시작 */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* 저장 실패는 무시 */
    }
  }, [items, ready]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...prev, { id, qty }]
    );
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * (getProduct(i.id)?.price ?? 0), 0);
    return { items, count, total, add, setQty, remove };
  }, [items, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider가 필요합니다");
  return c;
}
