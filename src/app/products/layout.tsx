import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Pick & Pack's extensive range of packaging solutions. From food and beverage packaging to shipping solutions, discover innovative designs that protect and promote your products.",
  keywords: [
    "packaging products",
    "food packaging",
    "beverage packaging",
    "shipping packaging",
    "product packaging solutions",
    "custom packaging",
    "packaging design",
    "brand packaging",
  ],
  openGraph: {
    title: "Products - Pick & Pack",
    description:
      "Explore Pick & Pack's extensive range of packaging solutions for food, beverages, and shipping.",
    url: "https://pickanpack.vercel.app/products",
    type: "website",
    images: [
      {
        url: "/images/products/tea-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Pick & Pack Product Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Pick & Pack",
    description:
      "Explore Pick & Pack's extensive range of packaging solutions for food, beverages, and shipping.",
    images: ["/images/products/tea-placeholder.svg"],
  },
  alternates: {
    canonical: "https://pickanpack.vercel.app/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
