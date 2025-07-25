"use client";

import { fetchUrl } from "@/utils/fetchUrl";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Journal } from "@/types/journal";
import JournalList from "./components/JournalList";
import JournalPagination from "./components/JournalPagination";

const PAGE_SIZE = 6;

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorFilter, setAuthorFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      let query = "";
      if (authorFilter !== "All") {
        query = `?where=createdBy%3D'${encodeURIComponent(authorFilter)}'`;
      }
      const countData = await fetchUrl("journals/count", query);
      setTotal(Number(countData));
    }
    fetchTotal();
  }, [authorFilter]);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        let query = `?pageSize=${PAGE_SIZE}&sortBy=created DESC&page=${page}`;
        if (authorFilter !== "All") {
          query += `&where=createdBy%3D'${encodeURIComponent(authorFilter)}'`;
        }
        const data = await fetchUrl("journals", query);
        setJournals(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, [authorFilter, page]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [authorFilter]);

  const authors = [
    "All",
    ...Array.from(new Set(journals.map((j) => j.createdBy))),
  ];

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <motion.main
      className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-26"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
    >
      <motion.section
        className="max-w-full mx-auto"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <motion.h1
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            JOURNAL
          </motion.h1>
          {/* Filtering */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="author"
              className="text-sm text-gray-700 self-center"
            >
              Filter by author:
            </label>
            <select
              id="author"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {authors.map((a, idx) => (
                <option key={`${a}-${idx}`} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {loading && (
          <motion.div
            className="text-center text-gray-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading journals...
          </motion.div>
        )}
        {error && (
          <motion.div
            className="text-center text-red-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {!loading && !error && (
          <>
            <JournalList journals={journals} />
            <JournalPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}
      </motion.section>
    </motion.main>
  );
}
