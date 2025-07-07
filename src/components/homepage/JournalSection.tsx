"use client";
import { articles } from "@/data/articles";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function JournalSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.5, once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 mt-20 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-16">
          <h2 className="text-3xl md:text-7xl font-bold text-gray-900">
            JOURNAL
          </h2>
          <Link
            href="/journal"
            className="text-gray-700 hover:text-green-700 font-medium text-base border-b border-gray-300 pb-1 ml-8 flex items-end"
          >
            Read all stories
            <span className="ml-1 text-xs text-gray-400 align-super">
              {articles.length}
            </span>
          </Link>
        </div>
        <div className="divide-y divide-gray-300">
          {articles.map(({ href, date, title }, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -100, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{
                delay: inView ? idx * 0.1 + 0.2 : 0,
                type: "spring",
                stiffness: 60,
              }}
            >
              <Link
                href={href}
                className="flex items-center py-8 group hover:bg-gray-50 transition-colors"
              >
                <div className="w-40 text-left text-gray-600 text-base">
                  {date}
                </div>
                <div className="flex-1 text-lg text-gray-900 group-hover:text-green-700 font-medium pl-4">
                  {title}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
