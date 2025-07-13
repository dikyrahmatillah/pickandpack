import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journals",
  description:
    "Discover insights, trends, and stories from the world of packaging design. Read our latest articles on branding, design innovation, and industry best practices.",
  keywords: [
    "packaging blog",
    "design articles",
    "packaging insights",
    "branding stories",
    "design trends",
    "packaging industry",
    "design inspiration",
    "packaging news",
  ],
  openGraph: {
    title: "Journals - Pick & Pack",
    description:
      "Discover insights, trends, and stories from the world of packaging design.",
    url: "https://pickandpack.vercel.app/journals",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "Pick & Pack Journals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journals - Pick & Pack",
    description:
      "Discover insights, trends, and stories from the world of packaging design.",
    images: ["/images/hero/hero-2.webp"],
  },
  alternates: {
    canonical: "https://pickandpack.vercel.app/journals",
  },
};

export default function JournalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
