import React from "react";
import { motion, Variants } from "framer-motion";

interface Props {
  totalPages: number;
  // accept either `currentPage`/`onChange` (products) or `page`/`setPage` (journals)
  currentPage?: number;
  page?: number;
  onChange?: (page: number) => void;
  setPage?: (page: number) => void;
  variants?: Variants;
}

export default function Pagination({
  totalPages,
  currentPage,
  page,
  onChange,
  setPage,
  variants,
}: Props) {
  if (totalPages <= 1) return null;

  const active = currentPage ?? page ?? 1;
  const change = (p: number) => {
    if (onChange) onChange(p);
    else if (setPage) setPage(p);
  };

  return (
    <motion.div
      className="flex justify-center items-center mt-8 gap-2"
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 20 }}
      animate={variants ? undefined : { opacity: 1, y: 0 }}
      transition={variants ? undefined : { duration: 0.5, delay: 0.2 }}
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => change(i + 1)}
          className={`px-4 py-2 rounded-xl cursor-pointer ${
            active === i + 1 ? "bg-white text-black border" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </motion.div>
  );
}
