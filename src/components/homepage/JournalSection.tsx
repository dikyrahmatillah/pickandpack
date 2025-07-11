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
      className="py-10 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6 mt-20 sm:px-8 lg:px-10">
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900">
            JOURNAL
          </h2>
          <Link
            href="/journal"
            className="text-gray-700 hover:text-green-700 font-medium text-sm border-b border-gray-300 pb-1 ml-4 flex items-end"
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
                className="flex items-center py-5 group hover:bg-gray-50 transition-colors"
              >
                <div className="w-28 text-left text-gray-600 text-sm">
                  {date}
                </div>
                <div className="flex-1 text-base text-gray-900 group-hover:text-green-700 font-medium pl-3">
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
