import React from "react";
import { motion, Variants } from "framer-motion";

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  variants?: Variants;
}

export default function Pagination({
  totalPages,
  currentPage,
  onChange,
  variants,
}: Props) {
  if (totalPages <= 1) return null;
  return (
    <motion.div
      className="flex justify-center items-center mt-8 gap-2"
      variants={variants}
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-4 py-2 rounded-xl cursor-pointer ${
            currentPage === i + 1 ? "bg-white text-black border" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </motion.div>
  );
}
