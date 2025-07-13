"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { partners } from "@/data/partners";
import styles from "./PartnerSection.module.css";

export default function PartnerSection() {
  const animatedCategories = [...partners, ...partners];
  const [marquee, setMarquee] = useState(false);

  return (
    <motion.section
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
          className={`flex gap-10 min-w-[max-content] ${
            marquee ? styles.marquee : ""
          }`}
        >
          {animatedCategories.map((category, idx) => {
            const filename = `${category
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/&/g, "and")}.png`;
            return (
              <Link
                key={category + idx}
                href={`/industries/${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/&/g, "and")}`}
                className="flex items-center justify-center min-w-[180px] min-h-[100px]"
              >
                <Image
                  src={`/images/clients/${filename}`}
                  alt={category}
                  width={140}
                  height={70}
                  className="object-contain max-h-10 h-auto w-auto"
                  loading="lazy"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
