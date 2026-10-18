import type { Product } from "@/lib/products";

export default function Placeholder({ p, big = false }: { p: Product; big?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${p.name} 이미지`}
      className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 14px)" }}
      />
      <span className={big ? "relative text-8xl" : "relative text-6xl"} aria-hidden="true">{p.emoji}</span>
      <span className="relative mt-4 px-4 text-center text-sm font-semibold text-white drop-shadow">{p.name}</span>
    </div>
  );
}
