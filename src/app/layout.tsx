import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { GTMScript, GTMNoscript } from "@/components/GTM";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GTM Practice Site",
  description: "A simple site to practice Google Tag Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMScript gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </head>
      <body className={`${geistSans.variable} antialiased bg-gray-50 text-gray-900`}>
        <GTMNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-blue-600">
              GTM Practice
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
          {children}
        </main>
        <footer className="border-t bg-white mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            GTM Practice Site &copy; 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
