"use client";

import { whyUs } from "@/data/whyUs";
import { motion } from "framer-motion";

export default function WhyUsSection() {
  return (
    <motion.section
      className="py-20 bg-white my-10 md:my-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MENGAPA HARUS PICK & PACK
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {whyUs.map((flow, index) => (
            <motion.div
              key={index}
              className="group bg-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${flow.color}`}
              >
                #{index + 1}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {flow.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {flow.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
