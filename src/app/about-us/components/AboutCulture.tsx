import { motion, Variants } from "framer-motion";

export default function AboutCulture({
  sectionVariant,
}: {
  sectionVariant: Variants;
}) {
  return (
    <motion.section
      className="py-20 bg-white"
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Our Culture
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Innovation & Collaboration
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              We foster a creative environment where everyone’s ideas are
              valued. Our team works closely together to solve challenges and
              deliver the best results for our clients.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              We are committed to using eco-friendly materials and processes,
              and we encourage our clients to choose sustainable options for
              their packaging.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Customer Focus
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              Our clients are at the heart of everything we do. We listen,
              adapt, and go the extra mile to ensure their packaging needs are
              met.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Growth & Learning
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              We believe in continuous improvement, both as individuals and as a
              company. We invest in training and encourage our team to keep
              learning.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
