import { motion } from "framer-motion";
import JournalCard from "./JournalCard";
import { Journal } from "@/types/journal";

export default function JournalList({ journals }: { journals: Journal[] }) {
  if (journals.length === 0) {
    return (
      <motion.div
        className="text-center text-gray-400 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        No journals found.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {journals.map((journal) => (
        <JournalCard key={journal.objectId} journal={journal} />
      ))}
    </motion.div>
  );
}
