import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "@/providers/AuthProvider";
import BoxCursor from "@/components/cursor/cursor";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pick & Pack - Packaging Solutions",
  description:
    "Premium packaging solutions for your products. Design, develop and deliver exceptional packaging experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BoxCursor />
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
