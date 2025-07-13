import { motion, Variants } from "framer-motion";

export default function AboutHistory({
  sectionVariant,
  textVariant,
}: {
  sectionVariant: Variants;
  textVariant: Variants;
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="relative h-64 w-64 rounded-2xl overflow-hidden bg-gray-100 m-auto"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-lg font-bold text-gray-700">
                  Proudly Indonesian
                </div>
              </div>
            </div>
          </motion.div>
          <div>
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-3"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              Our History
            </motion.h2>
            <motion.div
              className="space-y-2 text-base text-gray-600 leading-relaxed"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              <p>
                Pick & Pack was founded in 2018 by a group of passionate
                designers and engineers who saw the need for innovative,
                eco-friendly packaging solutions in Indonesia.
              </p>
              <p>
                Starting from a small workshop, we quickly grew by partnering
                with local businesses and delivering creative, high-quality
                packaging that made their products shine.
              </p>
              <p>
                <strong>Milestones:</strong>
              </p>
              <ul className="list-disc ml-6 mt-1 text-sm">
                <li>2018: Company founded in Jakarta</li>
                <li>2019: Launched our first eco-friendly box series</li>
                <li>2021: Expanded to serve clients nationwide</li>
                <li>2023: Reached 1,000+ custom packaging projects</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
