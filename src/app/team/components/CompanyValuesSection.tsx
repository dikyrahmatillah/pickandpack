"use client";

import { motion, Variants } from "framer-motion";

export default function CompanyValuesSection({
  sectionVariant,
}: {
  sectionVariant: Variants;
}) {
  return (
    <motion.section
      className="-mx-4 sm:-mx-8 md:-mx-28 py-30 bg-gray-50"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Our Values
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            The principles that guide our team and shape our company culture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ...value cards... */}
          <div className="bg-white rounded-[15%] p-14 text-center shadow-md">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              💡
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">
              We constantly explore new materials, designs, and processes to
              create packaging solutions that exceed expectations.
            </p>
          </div>
          <div className="bg-white rounded-[15%] p-14 text-center shadow-md">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              🌱
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600 text-sm">
              Environmental responsibility is at the core of everything we do,
              from material selection to production processes.
            </p>
          </div>
          <div className="bg-white rounded-[15%] p-14 text-center shadow-md">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              🤝
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Partnership
            </h3>
            <p className="text-gray-600 text-sm">
              We build lasting relationships with our clients, treating their
              challenges as our own and celebrating their successes.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
