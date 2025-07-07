"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import hero_content from "@/data/heroContent";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % hero_content.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + hero_content.length) % hero_content.length
    );
  };

  return (
    <section className="w-full px-4 md:px-10 lg:px-28">
      <div className="w-full h-[calc(100vh-6rem)] min-h-[32rem] flex flex-col items-center sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-0">
        {/* Hero Text */}
        <div className="w-full h-full flex flex-col justify-center items-center text-center sm:mb-6 lg:mb-0 pr-0 lg:pr-16 lg:items-end lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight tracking-tight text-neutral-900 drop-shadow-xl">
                {hero_content[current].title}
                <br />
                {hero_content[current].highlight && (
                  <span className="text-gray-800">
                    {hero_content[current].highlight}
                  </span>
                )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed">
                {hero_content[current].description}
              </p>
              <Link
                href="https://api.whatsapp.com/send?phone=6285169576390&text=Halo,%20Saya%20tertarik%20untuk%20custom%20packaging.%20bisa%20tolong%20dibantu%20?"
                target="_blank"
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-gray-800 uppercase tracking-wide"
              >
                Konsultasikan Sekarang
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Carousel Box */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[32rem] sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[56rem] xl:max-w-[62rem] aspect-square overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
            {/* Navigation Buttons - left */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20"
            >
              <FontAwesomeIcon
                className="text-2xl sm:text-4xl"
                icon={faChevronLeft}
              />
            </button>
            {/* Sliding window carousel */}
            <div className="w-full h-full overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {/* Previous or next image (exiting) */}
                <motion.div
                  key={current + "-slide"}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? "100%" : "-100%",
                    position: "absolute",
                  }}
                  animate={{ x: 0, position: "absolute" }}
                  exit={{
                    x: direction > 0 ? "-100%" : "100%",
                    position: "absolute",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full top-0 left-0"
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src={hero_content[current].image}
                    alt="Hero Slide"
                    fill
                    className="object-contain transition-transform duration-5000 ease-out hover:scale-110"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Navigation Buttons - right */}
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20"
            >
              <FontAwesomeIcon
                className="text-2xl sm:text-4xl"
                icon={faChevronRight}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
