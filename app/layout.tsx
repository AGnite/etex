import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import LeftRail from "@/components/LeftRail";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "etex // the auto parts company · since 1971",
  description:
    "etex — Cyprus's largest and most dependable stockist-wholesale distributor of automotive aftermarket spare parts. Founded 1971 in Nicosia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <LenisProvider>
          <div className="grid-overlay" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} />
            ))}
          </div>
          <div className="scanlines" aria-hidden />
          <div className="noise" aria-hidden />
          <LeftRail />
          <main className="relative z-[5] pl-[68px]">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
