import type { Metadata } from "next";
import AdminClient from "@/components/AdminClient";

export const metadata: Metadata = {
  title: "상품 관리 – gabby",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="wrap py-16">
      <h1 className="text-4xl font-bold tracking-tight">상품 관리</h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        상품을 고치거나 추가한 뒤 &quot;코드 복사&quot;를 누르고, <code>lib/products.ts</code>의 <code>products</code> 배열을 붙여넣은 코드로 바꿔 GitHub에 올리면 사이트에 반영돼요.
      </p>
      <div className="mt-10">
        <AdminClient />
      </div>
    </section>
  );
}
