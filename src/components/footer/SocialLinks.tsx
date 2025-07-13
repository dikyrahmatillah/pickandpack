import { motion } from "framer-motion";

export default function SocialLinks() {
  return (
    <motion.div
      className="border-t border-gray-800 mt-8 pt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">FOLLOW US</h3>
          <motion.a
            href="https://www.instagram.com/pickandpack_id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-white transition-colors"
            whileHover={{ scale: 1.08, color: "#22c55e" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            @pickandpack_id
          </motion.a>
        </div>
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Pick & Pack. All rights reserved.
        </div>
      </div>
    </motion.div>
  );
}
