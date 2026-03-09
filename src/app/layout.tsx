import type { Metadata } from "next";
import { tajawal } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aljazira Bank — Annual Report 2025",
  description: "Wealth Grows Here. Explore Aljazira Bank's 2025 Annual Report.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="lenis">
      <body className={`${tajawal.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
