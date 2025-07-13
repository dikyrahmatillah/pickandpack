import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Journal } from "@/types/journal";

export default function JournalCard({ journal }: { journal: Journal }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-6 border-b pb-8 bg-white rounded-xl shadow-md p-6"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
    >
      <div className="w-full md:w-56 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 h-40 md:h-36">
        <Image
          src={journal.coverImage}
          alt={journal.title}
          width={224}
          height={144}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <span className="text-sm text-gray-500">
            {new Date(journal.publishDate).toLocaleString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
          <span className="hidden sm:inline text-sm text-gray-400 mx-2">|</span>
          <span className="text-sm text-gray-500">{journal.createdBy}</span>
          {journal.minutesRead && (
            <>
              <span className="hidden sm:inline text-sm text-gray-400 mx-2">
                |
              </span>
              <span className="text-sm text-gray-500">
                {journal.minutesRead} min read
              </span>
            </>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          <Link href={`journals/${journal.slug}`}>{journal.title}</Link>
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-2">
          {journal.excerpt}
        </p>
        <Link
          href={`journals/${journal.slug}`}
          className="text-blue-600 hover:underline text-base md:text-lg font-medium"
        >
          Baca lebih lengkap
        </Link>
      </div>
    </motion.div>
  );
}
