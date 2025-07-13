"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Shop Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">SHOP</h3>
            <ul className="space-y-6">
              <li>
                <Link href="/" className="text-gray-800 transition-colors">
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-800 transition-colors"
                >
                  products
                </Link>
              </li>
              <li>
                <Link
                  href="/top-sales"
                  className="text-gray-800 transition-colors"
                >
                  top sales
                </Link>
              </li>
              <li>
                <Link
                  href="/premium-tea"
                  className="text-gray-800 transition-colors"
                >
                  premium tea
                </Link>
              </li>
              <li>
                <Link href="/set" className="text-gray-800 transition-colors">
                  set
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Help Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-800 transition-colors"
                >
                  delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns-exchanges"
                  className="text-gray-800 transition-colors"
                >
                  returns and exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-800 transition-colors"
                >
                  terms and conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-800 transition-colors"
                >
                  privacy policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* About Us Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-800 transition-colors"
                >
                  about us
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-800 transition-colors"
                >
                  contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-gray-800 transition-colors"
                >
                  journal
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Section */}
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
              You can safely unsubscribe anytime from any email footer. Here is
              our{" "}
              <Link
                href="/privacy-policy"
                className="text-green-400 hover:text-green-300"
              >
                privacy policy
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Social Media and Bottom Section */}
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
                className="text-gray-800 transition-colors"
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
      </div>
    </footer>
  );
}
