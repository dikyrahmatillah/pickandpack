import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Pick & Pack's story, our team, and our mission to revolutionize packaging design. Discover how we create exceptional packaging experiences that elevate brands worldwide.",
  keywords: [
    "about Pick & Pack",
    "packaging agency team",
    "company story",
    "packaging experts",
    "brand design team",
    "creative agency",
    "packaging professionals",
    "design studio",
  ],
  openGraph: {
    title: "About Us - Pick & Pack",
    description:
      "Learn about Pick & Pack's story, our team, and our mission to revolutionize packaging design.",
    url: "https://pickandpack.vercel.app/about-us",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-2.webp",
        width: 1200,
        height: 630,
        alt: "About Pick & Pack Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Pick & Pack",
    description:
      "Learn about Pick & Pack's story, our team, and our mission to revolutionize packaging design.",
    images: ["/images/hero/hero-2.webp"],
  },
  alternates: {
    canonical: "https://pickandpack.vercel.app/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
