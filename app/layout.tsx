import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { STORE } from "@/lib/products";

export const metadata: Metadata = {
  title: `${STORE.name} – ${STORE.headline}`,
  description: "유행보다 오래 입는 옷. 탄탄한 원단과 군더더기 없는 실루엣의 베이직 웨어 gabby입니다.",
  openGraph: {
    title: `${STORE.name} – ${STORE.headline}`,
    description: "유행보다 오래 입는 옷. 탄탄한 원단과 군더더기 없는 실루엣의 베이직 웨어 gabby입니다.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
