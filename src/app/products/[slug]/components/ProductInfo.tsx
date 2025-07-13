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
      className="flex-1 flex flex-col gap-y-2 mt-8 md:mt-0 mx-2"
    >
      <Link
        href="/products"
        className="text-gray-500 text-base sm:text-lg mb-4"
      >
        ← Kembali ke daftar produk
      </Link>
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold m-0 break-words">
        {product.name}
      </h1>
      <div className="mb-2 text-gray-500 text-base sm:text-xl">Category:</div>
      <div className="text-lg sm:text-2xl mb-6">{product.category}</div>
      <div className="text-gray-500 text-base sm:text-xl mb-2">Material:</div>
      <div className="text-lg sm:text-2xl mb-6">{product.material}</div>
      <div className="text-gray-500 text-base sm:text-xl mb-2">
        Cocok Untuk:
      </div>
      <div className="text-lg sm:text-2xl mb-6">{product.utility}</div>
      <div className="text-gray-500 text-base sm:text-xl mb-2">Deskripsi:</div>
      <div className="text-lg sm:text-2xl mb-6">{product.description}</div>
      <div className="flex flex-wrap gap-3 mb-8"></div>
      <div className="flex items-center gap-6 mb-4">
        <button className="bg-black text-white border-none rounded-4xl px-8 sm:px-16 py-4 sm:py-6 text-lg sm:text-[22px] font-bold flex items-center gap-4 cursor-pointer">
          <span className="text-2xl">🛒</span> Hubungi Kami
        </button>
      </div>
    </motion.div>
  );
}
