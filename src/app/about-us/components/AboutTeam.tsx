import { motion, Variants } from "framer-motion";
import TeamGrid from "@/components/TeamGrid";

export default function AboutTeam({ textVariant }: { textVariant: Variants }) {
  return (
    <section className="-mx-4 sm:-mx-8 md:-mx-28 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-base text-gray-600 max-w-2xl mx-auto"
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            Our team combines creativity, technical expertise, and a passion for
            packaging.
          </motion.p>
        </div>
        <TeamGrid />
      </div>
    </section>
  );
}
