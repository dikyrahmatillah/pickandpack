"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PartnerSection() {
  const categories = [
    "atmos",
    "barkerman",
    "beauty-haul",
    "chigo",
    "eatlah",
    "fred-ferry",
    "gojek",
    "grab-food",
    "howel-and-co",
    "jiwa-toast",
    "keds",
    "kopi-kenangan",
    "limau",
    "l-occitane",
    "moon-chicken",
    "nike",
    "optik-seis",
    "pezzo",
    "pizza-birra",
    "quiksilver",
    "social-affair",
    "sociolla",
    "superga",
    "sushi-hiro",
    "the-north-face",
    "timberland",
    "whitelab",
  ];

  // Duplicate for seamless marquee
  const animatedCategories = [...categories, ...categories];
  const [marquee, setMarquee] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.75 }}
      className="w-full max-w-[100vw] overflow-x-hidden bg-gray-50 py-8 flex flex-col items-center justify-center"
      onAnimationComplete={() => setMarquee(true)}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Proud to partner with these brands that trust us
      </h3>
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-10"
          style={{
            minWidth: "max-content",
            animation: marquee ? "marquee 60s linear infinite" : undefined,
          }}
        >
          {animatedCategories.map((category, idx) => {
            // Convert category name to filename (lowercase, spaces and & replaced with -)
            const filename =
              category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") +
              ".png";
            return (
              <Link
                key={category + idx}
                href={`/industries/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/&/g, "and")}`}
                className="flex items-center justify-center"
                style={{ minWidth: 180, minHeight: 100 }}
              >
                <Image
                  src={`/images/clients/${filename}`}
                  alt={category}
                  width={140}
                  height={70}
                  className="object-contain max-h-20"
                  loading="lazy"
                />
              </Link>
            );
          })}
        </div>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
    </motion.div>
  );
}
