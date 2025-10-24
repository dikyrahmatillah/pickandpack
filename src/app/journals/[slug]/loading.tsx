"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Loading() {
  return (
    <motion.main
      className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-25"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-6" variants={itemVariants}>
        <div className="h-3 w-40 bg-gray-200 rounded-md animate-pulse" />
      </motion.div>

      <motion.div
        className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-6"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
          <div className="p-6 md:p-10 w-full">
            <div className="h-8 md:h-10 lg:h-12 bg-gray-300 rounded-md w-3/4 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="py-6 border-b flex items-center gap-4"
        variants={itemVariants}
      >
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
          <div className="flex gap-2 items-center">
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.div className="w-full py-8" variants={itemVariants}>
        <motion.div className="space-y-3" variants={itemVariants}>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />

          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse" />
          </div>

          <div className="mt-8">
            <div className="h-10 w-56 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          className="w-full flex items-center justify-center mt-8"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-2 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-2 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
