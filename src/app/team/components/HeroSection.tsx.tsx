"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      className="-mx-4 sm:-mx-8 md:-mx-28 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Team
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Meet the talented individuals behind Pick & Pack. Our diverse team
            combines creativity, technical expertise, and passion to deliver
            exceptional packaging solutions.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
