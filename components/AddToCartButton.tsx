"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCartButton({
  id, qty = 1, label = "담기", primary = false,
}: { id: string; qty?: number; label?: string; primary?: boolean }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add(id, qty);
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
      }}
      className={primary ? "btn-primary" : "btn-outline !px-4 !py-2"}
    >
      {done ? "담았어요" : label}
    </button>
  );
}
