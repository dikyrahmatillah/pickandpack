"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const images = [
  { src: "/images/portofolio/asto.webp", alt: "Asto" },
  { src: "/images/portofolio/bakerman.webp", alt: "Bakerman" },
  { src: "/images/portofolio/bca-solitaire.webp", alt: "BCA Solitaire" },
  { src: "/images/portofolio/bonavie.webp", alt: "Bonavie" },
  { src: "/images/portofolio/bossman.webp", alt: "Cafe 24" },
  { src: "/images/portofolio/coach.webp", alt: "Canada Embassy" },
];

export default function FollowUsSection() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.75, once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        },
      }}
      className="w-full py-6 mt-10 sm:py-10 md:py-14 bg-white pr-0 sm:pr-4 md:pr-10 overflow-x-hidden"
    >
      <div className="flex flex-col items-start w-3/4">
        <h2 className="text-2xl md:text-3xl ml-auto font-extrabold text-gray-900 mb-6 md:mb-8">
          FOLLOW US
        </h2>
        <div className="relative flex items-start w-full">
          <div className="flex flex-col sm:flex-row-reverse items-start gap-2 sm:gap-4 w-full overflow-hidden sm:ml-0">
            <div className="block sm:hidden w-full">
              <motion.div
                className="overflow-hidden shadow-lg rounded-2xl"
                style={{ maxWidth: 320, aspectRatio: "1/1" }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut" },
                  },
                }}
                animate={controls}
              >
                <Link
                  href="https://www.instagram.com/pickandpack_id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram"
                >
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    sizes="90vw"
                  />
                </Link>
              </motion.div>
            </div>
            <div className="hidden sm:flex flex-row-reverse items-start gap-4 w-full">
              {images.map((img, i) => (
                <motion.div
                  key={img.src}
                  className={`relative overflow-hidden shadow-lg flex-shrink-0 ${
                    i === 0 ? "rounded-2xl sm:rounded-3xl" : "rounded-none"
                  } group`}
                  style={{
                    maxWidth: 320,
                    aspectRatio: "1/1",
                    zIndex: images.length - i,
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: i * 0.1,
                        ease: "easeOut",
                      },
                    },
                  }}
                  initial="hidden"
                  animate={controls}
                >
                  <Link
                    href="https://www.instagram.com/pickandpack_id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram"
                    className="block w-full h-full"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={320}
                      height={320}
                      className="object-cover w-full h-full transition-all duration-300 group-hover:blur-sm"
                      sizes="(min-width: 1200px) 320px, (min-width: 640px) 33vw, 90vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="mb-2 text-white"
                        size="2x"
                      />
                      <span className="text-white text-base font-semibold">
                        Follow us on Instagram
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
