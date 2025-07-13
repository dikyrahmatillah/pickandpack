"use client";

import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function CallUsSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.5, once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="mt-24 text-center bg-gray-100 rounded-none sm:rounded-[4rem] px-2 sm:px-6 md:px-12 py-10 md:py-20 text-black w-full mx-auto flex flex-col items-center overflow-x-hidden"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
          },
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-3">
          Ready to Create Your Custom Packaging?
        </h3>
        <p className="text-base mb-4 text-gray-700">
          Let our experts help you design the perfect packaging solution for
          your business
        </p>
        <Link
          href="https://api.whatsapp.com/send?phone=6285169576390&text=Halo,%20Saya%20tertarik%20untuk%20custom%20packaging.%20bisa%20tolong%20dibantu%20?"
          target="_blank"
          className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-base transition-colors"
        >
          Start Your Project Now
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.991 8.991 0 01-4.426-1.199L3 21l2.199-5.574A8.991 8.991 0 013 12a8 8 0 1116 0z"
            />
          </svg>
        </Link>
      </motion.div>
    </motion.section>
  );
}
