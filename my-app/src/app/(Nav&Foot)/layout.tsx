import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "A Katana-Z",
    description: "katana kualitas kaki 5 harga bintang 5",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const token = cookies().get("Authorization")

    if (!token) return redirect("/login")

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
