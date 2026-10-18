import Link from "next/link";
import { won, type Product } from "@/lib/products";
import Placeholder from "./Placeholder";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex flex-col border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      <Link href={`/products/${p.id}`} aria-label={`${p.name} 상세 보기`}>
        <Placeholder p={p} />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${p.id}`} className="font-semibold hover:text-brand">{p.name}</Link>
        <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold">{won(p.price)}</span>
          <AddToCartButton id={p.id} />
        </div>
      </div>
    </article>
  );
}
