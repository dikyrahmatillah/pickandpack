"use client";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Journal } from "@/types/journal";
import { fetchUrl } from "@/utils/fetchUrl";

export default function JournalSection() {
  const sectionRef = useRef(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.5, once: true });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUrl("journals", "?pageSize=6");
        setJournals(data);
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const articleMotionProps = (idx: number) => ({
    initial: { x: -100, opacity: 0 },
    animate: inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 },
    transition: {
      delay: inView ? idx * 0.1 + 0.2 : 0,
      type: "spring" as const,
      stiffness: 60,
    },
  });

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
            href="/journals"
            className="text-gray-700 hover:text-green-700 font-medium text-sm border-b border-gray-300 pb-1 ml-4 flex items-end"
          >
            Read all stories
          </Link>
        </div>
        <div className="divide-y divide-gray-300">
          {journals.map((journal, i) => (
            <motion.div key={i} {...articleMotionProps(i)}>
              <Link
                href={journal.slug}
                className="flex items-center py-5 group hover:bg-gray-50 transition-colors"
              >
                <div className="w-28 text-left text-gray-600 text-sm">
                  {new Date(journal.publishDate).toLocaleString("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div className="flex-1 text-base text-gray-900 group-hover:text-green-700 font-medium pl-3">
                  {journal.title}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
