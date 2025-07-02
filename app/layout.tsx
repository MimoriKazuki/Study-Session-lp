import type { Metadata } from "next";
import { Noto_Sans_JP, Orbitron } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-sans-jp",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "夏休み特別企画：生成AIでゲームを作ろう！",
  description: "最新の生成AIを使ったゲーム制作体験教室。小学生〜高校生対象。夏休みの自由研究にも最適！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${orbitron.variable}`}>
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}