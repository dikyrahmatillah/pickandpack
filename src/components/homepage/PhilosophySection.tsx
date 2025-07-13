"use client";

import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, rotate: -6, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      type: "spring" as const,
      bounce: 0.25,
      delay: 0.15,
    },
  },
};

export default function PhilosophySection() {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="py-10 bg-white"
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <div className="max-w-5xl mx-auto px-2 mt-10 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="space-y-4" variants={cardVariants}>
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900">
              PHILOSOPHY
            </h2>
            <Link
              href="/about-us"
              className="font-medium text-base transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-1"
            >
              about us
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </motion.div>
          <motion.div className="relative" variants={cardVariants}>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-6 h-72 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <div className="text-xl font-bold text-gray-800">
                    Let&apos;s make the box.
                  </div>
                  <div className="text-sm text-gray-600">
                    Our pick and pack philosophy is rooted in precision, care,
                    and efficiency. We meticulously select and package every
                    order to ensure quality and satisfaction, delivering
                    excellence from our hands to yours.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
