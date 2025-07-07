// src/data/heroContent.ts
export interface HeroContentItem {
  title: string;
  highlight?: string;
  description: string;
  image: string;
}

const hero_content: HeroContentItem[] = [
  {
    title: "CUSTOM PACKAGING PERFECT FOR",
    highlight: "YOUR BRAND",
    description: "Perfect for Businesses & Brands Looking to Stand Out",
    image: "/images/hero/hero-1.webp",
  },
  {
    title: "BRING YOUR CREATIVE IDEAS TO LIFE",
    highlight: "WITH CUSTOM PACKAGING",
    description: "Reflects your brand’s unique personality and vision.",
    image: "/images/hero/hero-2.webp",
  },
  {
    title: "DELIVER A UNIQUE EXPERIENCE",
    highlight: "THROUGH CUSTOM PACKAGING",
    description: "Enhances your product presentation and brand identity.",
    image: "/images/hero/hero-3.webp",
  },
];

export default hero_content;
