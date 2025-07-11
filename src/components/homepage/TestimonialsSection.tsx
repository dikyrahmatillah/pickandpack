"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const items = testimonials.slice(0, 8);
  const [activeIdx, setActiveIdx] = useState(2);
  const [visibleCount, setVisibleCount] = useState(5); // default to 5
  const total = items.length;

  // Responsive visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1); // mobile
      else if (window.innerWidth < 1024) setVisibleCount(3); // tablet
      else setVisibleCount(5); // desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Returns visibleCount items centered on activeIdx, with wrap-around
  const getVisibleItems = () =>
    Array.from({ length: visibleCount }, (_, i) => {
      const idx =
        (activeIdx + i - Math.floor(visibleCount / 2) + total) % total;
      return { ...items[idx], idx };
    });

  const handleMove = (dir: number) =>
    setActiveIdx((prev) => (prev + dir + total) % total);

  const centerItem = items[activeIdx];

  return (
    <>
      <motion.section
        className="py-10 bg-gray-100"
        initial={{ opacity: 0, scale: 0.95, y: 80, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1], // easeOutExpo
        }}
      >
        <div className="max-w-screen mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              TESTIMONIALS
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Real stories, real results from our clients and partners
            </p>
          </div>
          <div className="relative flex flex-col items-center mb-8">
            {/* Carousel Container */}
            <div className="relative w-full flex justify-center items-center">
              {/* Left Nav Button */}
              <button
                aria-label="Previous"
                onClick={() => handleMove(-1)}
                className="absolute left-0 sm:left-1/3 top-1/2 -translate-y-1/2 z-20"
              >
                <FontAwesomeIcon
                  className="text-4xl hover:scale-125 transition-transform duration-1000"
                  icon={faChevronLeft}
                />
              </button>
              <div className="w-full flex justify-center gap-2 sm:gap-4 md:gap-6">
                {getVisibleItems().map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 60, scale: 0.85 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: i === Math.floor(visibleCount / 2) ? 1.08 : 0.93,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      mass: 0.7,
                      delay: i * 0.08,
                    }}
                    className={`transition-all duration-300 rounded-2xl bg-white shadow-md overflow-hidden flex flex-col items-center ${
                      i === Math.floor(visibleCount / 2)
                        ? "shadow-2xl z-10 border-2 border-blue-400 "
                        : "opacity-80"
                    }`}
                  >
                    <div
                      style={{
                        width: 240,
                        height: 240,
                        maxWidth: "70vw",
                        maxHeight: "70vw",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-5000 ease-out hover:scale-110"
                        priority={i === Math.floor(visibleCount / 2)}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Right Nav Button */}
              <button
                aria-label="Next"
                onClick={() => handleMove(1)}
                className="absolute right-0 sm:right-1/3 top-1/2 -translate-y-1/2 z-20"
              >
                <FontAwesomeIcon
                  className="text-4xl hover:scale-125 transition-transform duration-1000"
                  icon={faChevronRight}
                />
              </button>
            </div>
            <div className="w-full flex flex-col items-center mt-6">
              <div className="max-w-md text-center">
                <div className="text-blue-700 font-bold text-sm md:text-base mb-1">
                  {centerItem.name}
                </div>
                <p className="text-gray-700 text-sm md:text-base ">
                  “{centerItem.review}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
