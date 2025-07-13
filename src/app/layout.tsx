import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "@/providers/AuthProvider";
import BoxCursor from "@/components/cursor/Cursor";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pick & Pack - Premium Packaging Solutions",
    template: "%s | Pick & Pack",
  },
  description:
    "Premium packaging solutions for your products. Design, develop and deliver exceptional packaging experiences with Pick & Pack's innovative approach.",
  keywords: [
    "packaging",
    "design",
    "branding",
    "product packaging",
    "custom packaging",
    "packaging solutions",
    "brand identity",
    "creative agency",
    "packaging design",
  ],
  authors: [{ name: "Pick & Pack Team" }],
  creator: "Pick & Pack",
  publisher: "Pick & Pack",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pickandpack.vercel.app",
    siteName: "Pick & Pack",
    title: "Pick & Pack - Premium Packaging Solutions",
    description:
      "Premium packaging solutions for your products. Design, develop and deliver exceptional packaging experiences.",
    images: [
      {
        url: "/images/hero/hero-1.webp",
        width: 1200,
        height: 630,
        alt: "Pick & Pack Packaging Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick & Pack - Premium Packaging Solutions",
    description:
      "Premium packaging solutions for your products. Design, develop and deliver exceptional packaging experiences.",
    images: ["/images/hero/hero-1.webp"],
  },
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
