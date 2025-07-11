"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Unique animation for content: fade in, scale up, rotate, blur
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
        bounce: 0.28,
        delay: 0.15,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-10 bg-white"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 1, type: "spring" as const, bounce: 0.22 },
        },
      }}
    >
      <div className="max-w-5xl mx-auto px-2 mt-10 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Content */}
          <motion.div
            className="space-y-4"
            variants={cardVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900">
              PHILOSOPHY
            </h2>

            <Link
              href="/about-us"
              className="font-medium text-base transition-all duration-300 transform hover:scale-105"
            >
              about us
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </motion.div>
          {/* Visual Content */}
          <motion.div
            className="relative"
            variants={cardVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-6 h-72 flex items-center justify-center">
              {/* Ocean and Tea Visualization */}
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
