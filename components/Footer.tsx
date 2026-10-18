import Link from "next/link";
import { STORE } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#1a1a1a] text-gray-300">
      <div className="wrap grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold text-white">{STORE.name}</p>
          <p className="mt-2 text-sm">{STORE.headline}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">주문 문의</p>
          <p className="mt-2">전화/문자 {STORE.phone}</p>
          <p>카카오톡 {STORE.kakao}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">바로가기</p>
          <p className="mt-2"><Link href="/products" className="hover:text-white">전체 상품</Link></p>
          <p><Link href="/order" className="hover:text-white">장바구니·주문</Link></p>
          <p><Link href="/admin" className="hover:text-white">관리자</Link></p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} {STORE.name}. All rights reserved.</p>
    </footer>
  );
}
