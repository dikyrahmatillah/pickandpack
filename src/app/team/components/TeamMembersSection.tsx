"use client";

import { motion, Variants } from "framer-motion";
import TeamGrid from "@/components/TeamGrid";

export default function TeamMembersSection({
  sectionVariant,
}: {
  sectionVariant: Variants;
}) {
  return (
    <motion.section
      className="py-20 bg-white"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-base text-gray-600 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The creative minds and skilled hands that make Pick & Pack a leader
            in sustainable packaging solutions.
          </motion.p>
        </div>
        <TeamGrid />
      </div>
    </motion.section>
  );
}
