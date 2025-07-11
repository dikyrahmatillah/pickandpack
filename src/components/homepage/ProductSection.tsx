"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { products } from "@/data/products";
import { motion } from "framer-motion";

export default function ProductSection() {
  const [start, setStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newStart = start + 1 >= products.length ? 0 : start + 1;
    setStart(newStart);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Get visible items count based on screen size
  const getVisibleCount = (breakpoint: string) => {
    switch (breakpoint) {
      case "mobile":
        return 1;
      case "sm":
        return 2;
      case "lg":
        return 3;
      case "xl":
        return 4;
      default:
        return 1;
    }
  };

  // Simplified sliding transition - only slide in
  const itemVariants = {
    hidden: {
      x: 300,
    },
    visible: {
      x: 0,
    },
  };

  const itemTransition = {
    type: "tween" as const,
    duration: 0.4,
  };

  const renderProductItems = (visibleCount: number, className: string) => {
    const items = [];

    for (let i = 0; i < visibleCount; i++) {
      const productIndex = (start + i) % products.length;
      const prod = products[productIndex];

      items.push(
        <motion.div
          key={`${prod.name}-${start}-${i}`}
          className={`${className} flex-col gap-3`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{
            ...itemTransition,
            delay: i * 0.1,
          }}
        >
          <div
            className={`rounded-4xl max-h-[70rem] max-w-[70rem] overflow-hidden transition-all duration-300 ease-out hover:shadow-xl ${
              i === 0 ? "rounded-sm" : ""
            }`}
          >
            <Image
              src={prod.images[0]}
              alt={prod.name}
              width={600}
              height={480}
              className="object-cover w-full h-full transition-transform duration-1000 ease-out hover:scale-110"
              style={{ borderRadius: "inherit" }}
            />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 my-3 tracking-wide uppercase transition-colors duration-300 hover:text-neutral-700">
            {prod.name}
          </h3>
          <p className="text-base text-neutral-700 mb-4">{prod.utility}</p>
        </motion.div>
      );
    }

    return items;
  };

  return (
    <section className="w-full py-4 mt-8 mx-auto flex justify-end">
      <div className="w-3/4 flex flex-col items-start">
        {/* name and filter */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="mb-1 font-bold tracking-tight text-neutral-900 text-xl sm:text-2xl">
            Produk Kami:
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-neutral-500 text-sm underline underline-offset-4">
              Produck baru:
            </span>
            <span className="text-neutral-700 font-bold text-sm">
              {products.length}
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="flex justify-end w-full">
          <div className="relative overflow-hidden min-h-[800px] h-[800px]">
            {/* Set fixed height here */}
            <motion.div
              key={start}
              className="flex gap-2 md:gap-4 max-w-full md:max-w-[calc(100vw-6rem)] justify-end h-full" // Ensure children stretch to full height
            >
              {/* 1 image on mobile */}
              <div className="sm:hidden flex gap-2 h-full">
                {renderProductItems(getVisibleCount("mobile"), "h-full")}
              </div>

              {/* 2 images on sm */}
              <div className="hidden sm:flex lg:hidden gap-2 h-full">
                {renderProductItems(getVisibleCount("sm"), "h-full")}
              </div>

              {/* 3 images on lg */}
              <div className="hidden lg:flex xl:hidden gap-2 h-full">
                {renderProductItems(getVisibleCount("lg"), "h-full")}
              </div>

              {/* 4 images on xl */}
              <div className="hidden xl:flex gap-2 h-full">
                {renderProductItems(getVisibleCount("xl"), "h-full")}
              </div>
            </motion.div>
            {/* Right Arrow */}
            <motion.button
              onClick={handleNext}
              aria-label="Next"
              disabled={isTransitioning}
              className="absolute right-[-0.1rem] top-1/4 -translate-y-1/2 w-8 h-8 rounded-l-lg bg-white border border-neutral-300 shadow flex items-center justify-center text-xl text-neutral-700 hover:bg-neutral-100 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="transition-transform duration-300 hover:translate-x-1"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
