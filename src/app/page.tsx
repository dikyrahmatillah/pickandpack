import { Metadata } from "next";
import HeroSection from "@/components/homepage/HeroSection";
import ProductSection from "@/components/homepage/ProductSection";
import WhyUsSection from "@/components/homepage/WhyUsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import PartnerSection from "@/components/homepage/PartnerSection";
import JournalSection from "@/components/homepage/JournalSection";
import PhilosophySection from "@/components/homepage/PhilosophySection";
import CallUsSection from "@/components/homepage/CallUsSection";
import FollowUsSection from "@/components/homepage/FollowUsSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Pick & Pack - Your premier partner for innovative packaging solutions. We create exceptional packaging experiences that elevate your brand and captivate your customers.",
  keywords: [
    "packaging design",
    "brand packaging",
    "custom packaging",
    "product packaging",
    "packaging agency",
    "creative packaging",
    "packaging innovation",
    "brand identity",
  ],
  openGraph: {
    title: "Pick & Pack - Premium Packaging Solutions",
    description:
      "Welcome to Pick & Pack - Your premier partner for innovative packaging solutions. We create exceptional packaging experiences that elevate your brand.",
    url: "https://pickandpack.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-1.webp",
        width: 1200,
        height: 630,
        alt: "Pick & Pack Packaging Solutions Hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick & Pack - Premium Packaging Solutions",
    description:
      "Welcome to Pick & Pack - Your premier partner for innovative packaging solutions.",
    images: ["/images/hero/hero-1.webp"],
  },
  alternates: {
    canonical: "https://pickandpack.vercel.app",
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <WhyUsSection />
      <TestimonialsSection />
      <PartnerSection />
      <JournalSection />
      <PhilosophySection />
      <CallUsSection />
      <FollowUsSection />
    </main>
  );
}
