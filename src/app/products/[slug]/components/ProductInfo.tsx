"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types/product";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col gap-y-1 mt-4 md:mt-0 mx-2"
    >
      <Link
        href="/products"
        className="text-gray-500 text-sm sm:text-base mb-3"
      >
        ← Kembali ke daftar produk
      </Link>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold m-0 break-words">
        {product.name}
      </h1>
      <div className="mb-1 text-gray-500 text-sm sm:text-base">Category:</div>
      <div className="text-sm sm:text-base mb-4">{product.category}</div>
      <div className="text-gray-500 text-sm sm:text-base mb-1">Material:</div>
      <div className="text-sm sm:text-base mb-4">{product.material}</div>
      <div className="text-gray-500 text-sm sm:text-base mb-1">
        Cocok Untuk:
      </div>
      <div className="text-sm sm:text-base mb-4">{product.utility}</div>
      <div className="text-gray-500 text-sm sm:text-base mb-1">Deskripsi:</div>
      <div className="text-sm sm:text-base mb-4">{product.description}</div>
      <div className="flex flex-wrap gap-3 mb-8"></div>
      <div className="flex items-center gap-4 mb-4">
        <button
          data-cursor="white"
          className="bg-black text-white border-none rounded-4xl px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base font-bold flex items-center gap-3 cursor-pointer"
        >
          <span className="text-lg">🛒</span> Hubungi Kami
        </button>
      </div>
    </motion.div>
  );
}
