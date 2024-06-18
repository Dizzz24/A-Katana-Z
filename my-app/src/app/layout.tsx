import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Katana-Z",
  description: "katana kualitas kaki 5 harga bintang 5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<p>loading...</p>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
