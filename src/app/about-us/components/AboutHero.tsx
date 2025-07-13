import { motion, Variants } from "framer-motion";

export default function AboutHero({ textVariant }: { textVariant: Variants }) {
  return (
    <motion.section
      className="-mx-4 sm:-mx-8 md:-mx-28 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-3"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              About Pick & Pack
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-gray-100 leading-relaxed"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              We create custom packaging boxes that help brands stand out and
              protect their products, with a focus on quality, creativity, and
              sustainability.
            </motion.p>
          </div>
          <motion.div
            className="relative h-64 w-64 rounded-2xl overflow-hidden m-auto"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-6xl text-white opacity-50">📦</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
