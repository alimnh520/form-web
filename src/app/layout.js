import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import ChildCom from "./ChildCom";

const banglaFont = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "700"], variable: '--font-noto-sans-bengali' });

export const metadata = {
  title: "ভূমি অটোমেশন সিস্টেম",
  description: "ভূমি অটোমেশন সিস্টেম",
  icons: {
    icon: '/1000059296.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={banglaFont.className}>
        <ChildCom children={children} />
      </body>
    </html>
  );
}
