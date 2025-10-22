"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { fetchUrl } from "@/utils/fetchUrl";
import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [start, setStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUrl("products", "?pageSize=6");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (isTransitioning || products.length === 0) return;
    setIsTransitioning(true);
    setStart((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getVisibleCount = () => {
    if (windowWidth >= 1280) return 4;
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  const renderProductItems = () => {
    const visibleCount = getVisibleCount();
    return Array.from({ length: visibleCount }).map((_, i) => {
      if (products.length === 0) return null;
      const idx = (start + i) % products.length;
      const product = products[idx];
      const images = JSON.parse(product.images);

      return (
        <motion.div
          key={`${product.name}-${start}-${i}`}
          className="flex-col gap-3"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.4, delay: i * 0.1 }}
        >
          <div className="rounded-4xl max-h-[70rem] max-w-[70rem] overflow-hidden transition-all duration-300 ease-out hover:shadow-xl">
            <Image
              src={images[0]}
              alt={product.name}
              width={600}
              height={480}
              className="object-cover w-full h-full transition-transform duration-4000 ease-out hover:scale-110"
              style={{ borderRadius: "inherit" }}
            />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 my-3 tracking-wide uppercase transition-colors duration-300 hover:text-neutral-700">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-base text-neutral-700 mb-4">{product.utility}</p>
        </motion.div>
      );
    });
  };

  return (
    <section className="w-full py-4 mt-8 mx-auto flex justify-end">
      <div className="w-3/4 flex flex-col items-start">
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
          <div className="flex items-center gap-2 mb-6">
            <span className="text-neutral-500 text-sm underline underline-offset-4">
              Produk baru:
            </span>
            <span className="text-neutral-700 font-bold text-sm">
              {products.length}
            </span>
          </div>
        </motion.div>
        <div className="flex justify-end w-full">
          <div className="relative overflow-hidden pb-4">
            <div className="flex gap-2 md:gap-4 max-w-full md:max-w-[calc(100vw-6rem)] justify-end">
              {renderProductItems()}
            </div>
            <motion.button
              onClick={handleNext}
              aria-label="Next"
              disabled={isTransitioning || products.length === 0}
              className="absolute right-[-0.1rem] top-1/4 -translate-y-1/2 w-8 h-8 rounded-l-lg bg-white border border-neutral-300 shadow flex items-center justify-center text-xl text-neutral-700 hover:bg-neutral-100 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
