"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { fetchUrl } from "@/utils/fetchUrl";
import { motion } from "framer-motion";
import CategoryFilter from "./components/CategoryFilter";
import SortOptions from "./components/SortOptions";
import ProductGrid from "./components/ProductGrid";
import Pagination from "@/components/Pagination";

const sidebar = ["Semua Produk", "Makanan", "Minuman", "Pengiriman"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

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

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("Semua Produk");
  const [sort, setSort] = useState("newest");
  const pageSize = 8;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchTotal() {
      let query = "";
      if (filter !== "Semua Produk") {
        query = `?where=category%3D'${filter}'`;
      }
      const countData = await fetchUrl("products/count", query);
      setTotal(Number(countData));
    }
    fetchTotal();
  }, [filter]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let where = "";
      if (filter !== "Semua Produk") {
        where = `&where=category%3D'${encodeURIComponent(filter)}'`;
      }
      let sortBy = "";
      if (sort === "price-asc") sortBy = "&sortBy=price%20asc";
      else if (sort === "price-desc") sortBy = "&sortBy=price%20desc";
      else if (sort === "name-asc") sortBy = "&sortBy=name%20asc";
      else if (sort === "name-desc") sortBy = "&sortBy=name%20desc";
      else if (sort === "oldest") sortBy = "&sortBy=created%20asc";
      else if (sort === "newest") sortBy = "&sortBy=created%20desc";

      const query = `?pageSize=${pageSize}&offset=${
        (page - 1) * pageSize
      }${where}${sortBy}`;
      const data = await fetchUrl("products", query);
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [page, filter, sort]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <motion.main
      className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-25"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <nav className="text-sm text-gray-400 mb-4">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">{">"}</span>
          </li>
          <li>Produk</li>
        </ol>
      </nav>

      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Produk Kami:</h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row">
        <motion.aside
          className="w-full lg:w-48 mb-8 lg:mb-0 lg:mr-8"
          variants={itemVariants}
        >
          <div className="mb-8">
            <div className="font-semibold text-base mb-4 text-gray-800 tracking-wide">
              Kategori
            </div>
            <CategoryFilter
              categories={sidebar}
              selected={filter}
              onSelect={(cat) => {
                setFilter(cat);
                setPage(1);
              }}
            />
          </div>
          <div className="mt-8">
            <div className="font-semibold text-base mb-2">Urutkan:</div>
            <SortOptions
              options={sortOptions}
              selected={sort}
              onSelect={(val) => {
                setSort(val);
                setPage(1);
              }}
            />
          </div>
        </motion.aside>

        {loading ? (
          <motion.div
            className="w-full flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900">
              <span className="sr-only">Loading...</span>
            </div>
          </motion.div>
        ) : (
          <motion.section className="flex-1" variants={containerVariants}>
            <ProductGrid products={products} />
          </motion.section>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={setPage}
        variants={itemVariants}
      />
    </motion.main>
  );
}
