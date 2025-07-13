import { motion } from "framer-motion";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function JournalPagination({
  page,
  totalPages,
  setPage,
}: Props) {
  if (totalPages <= 1) return null;
  return (
    <motion.div
      className="mt-12 flex flex-wrap gap-2 justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`px-5 py-3 rounded-xl font-semibold transition ${
            page === idx + 1
              ? "bg-gray-900 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
      >
        Next
      </button>
    </motion.div>
  );
}
