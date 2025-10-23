"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  const hasMultipleImages = images.length > 1;

  const handlePrev = () => {
    if (!hasMultipleImages) return;
    setSelected((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (!hasMultipleImages) return;
    setSelected((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 w-full lg:max-w-[50%]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible w-full md:w-auto">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className={`relative border-4 cursor-pointer flex-shrink-0
              w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36
              ${selected === idx ? "border-black" : "border-transparent"}
            `}
            variants={itemVariants}
            onClick={() => setSelected(idx)}
            tabIndex={0}
            role="button"
            aria-label={`Show image ${idx + 1}`}
          >
            <Image src={img} alt={name} fill className="object-cover " />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex-1 aspect-square max-w-full rounded-[8%] overflow-hidden flex items-center justify-center min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative"
        variants={itemVariants}
      >
        <AnimatePresence mode="wait" initial={false}>
          {images[selected] && (
            <motion.div
              key={images[selected]}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full flex items-center justify-center relative"
            >
              <Image
                src={images[selected]}
                alt={name}
                fill
                className="object-cover w-full h-full rounded-md"
                priority
                sizes="(max-width: 768px) 80vw, 600px"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/80 hover:bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black p-2 cursor-pointer"
              aria-label="Show previous image"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                width={20}
                height={20}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-white/80 hover:bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black p-2 cursor-pointer"
              aria-label="Show next image"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                width={20}
                height={20}
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
