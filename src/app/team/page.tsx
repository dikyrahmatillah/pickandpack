import { Metadata } from "next";
import HeroSection from "./components/HeroSection.tsx";
import TeamMembersSection from "./components/TeamMembersSection";
import CompanyValuesSection from "./components/CompanyValuesSection";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the creative minds behind Pick & Pack. Our talented team of designers, strategists, and packaging experts work together to create exceptional packaging experiences for your brand.",
  keywords: [
    "Pick & Pack team",
    "packaging designers",
    "creative team",
    "design team",
    "packaging experts",
    "brand strategists",
    "design professionals",
    "creative agency team",
  ],
  openGraph: {
    title: "Team - Pick & Pack",
    description:
      "Meet the creative minds behind Pick & Pack. Our talented team creates exceptional packaging experiences.",
    url: "https://pickandpack.vercel.app/team",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-3.webp",
        width: 1200,
        height: 630,
        alt: "Pick & Pack Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team - Pick & Pack",
    description:
      "Meet the creative minds behind Pick & Pack. Our talented team creates exceptional packaging experiences.",
    images: ["/images/hero/hero-3.webp"],
  },
  alternates: {
    canonical: "https://pickandpack.vercel.app/team",
  },
};

export default function TeamPage() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <main className="px-4 sm:px-8 md:px-28 py-2 pt-4 md:pt-8 mt-12">
      <HeroSection />
      <TeamMembersSection sectionVariant={sectionVariant} />
      <CompanyValuesSection sectionVariant={sectionVariant} />
    </main>
  );
}
