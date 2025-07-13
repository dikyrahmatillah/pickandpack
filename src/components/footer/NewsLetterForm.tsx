import Link from "next/link";
import { motion } from "framer-motion";

export default function NewsletterForm() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">GET 20% OFF</h3>
      <p className="text-gray-800 mb-4">
        Your first order + future sales updates.
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2">
        You can safely unsubscribe anytime from any email footer. Here is our{" "}
        <Link
          href="/privacy-policy"
          className="text-green-400 hover:text-green-300"
        >
          privacy policy
        </Link>
      </p>
    </motion.div>
  );
}
