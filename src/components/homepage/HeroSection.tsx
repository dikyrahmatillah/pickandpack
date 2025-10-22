"use client";

import Link from "next/link";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import hero_content from "@/data/heroContent";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideCount = hero_content.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const currentContent = useMemo(() => hero_content[current], [current]);

  return (
    <section className="w-full px-2 sm:px-4 md:px-8 lg:px-16 pt-25 md:pt-30 mb-30 lg:mb-50">
      <div className="w-full min-h-[60vh] flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-0">
        <div className="w-full flex flex-col justify-center items-center text-center mb-6 sm:mb-8 lg:mb-0 px-5 lg:pr-10 lg:items-end lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-4 max-w-xl mx-auto"
            >
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight text-neutral-900 drop-shadow-xl">
                {currentContent.title}
                <br />
                {currentContent.highlight && (
                  <span className="text-gray-800">
                    {currentContent.highlight}
                  </span>
                )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed">
                {currentContent.description}
              </p>
              <Link
                data-cursor="white"
                href="https://api.whatsapp.com/send?phone=6285169576390&text=Halo,%20Saya%20tertarik%20untuk%20custom%20packaging.%20bisa%20tolong%20dibantu%20?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:bg-gray-800 uppercase tracking-wide"
              >
                Konsultasikan Sekarang
                <span aria-hidden="true">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[26rem] sm:max-w-[32rem] md:max-w-[38rem] lg:max-w-[44rem] xl:max-w-[52rem] aspect-square overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 cursor-pointer hover:-translate-x-0.5 z-20"
            >
              <FontAwesomeIcon
                className="text-2xl sm:text-4xl"
                icon={faChevronLeft}
              />
            </button>
            <div className="w-full h-full overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
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
                    src={currentContent.image}
                    alt="Hero Slide"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-5000 ease-out hover:scale-110"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:translate-x-0.5 z-20"
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
