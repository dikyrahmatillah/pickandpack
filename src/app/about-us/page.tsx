"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TeamMember = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
  location: { country: string };
  email: string;
  phone: string;
};

const staticTeamInfo = [
  {
    position: "Co-Founder & CEO",
    description:
      "Leads the vision and growth of Pick & Pack, ensuring every client gets the best packaging experience.",
  },
  {
    position: "Head of Design",
    description:
      "Brings creative ideas to life, designing unique packaging that reflects each brand’s identity.",
  },
  {
    position: "Production Manager",
    description:
      "Oversees the production process, making sure every box meets our standards for quality and sustainability.",
  },
  {
    position: "Sales Director",
    description:
      "Drives business growth and builds strong relationships with our valued clients.",
  },
  {
    position: "Sustainability Lead",
    description:
      "Champions eco-friendly practices and ensures our packaging is as green as possible.",
  },
  {
    position: "Customer Success Manager",
    description:
      "Ensures every client receives outstanding service and support throughout their journey.",
  },
];

export default function AboutPage() {
  // Animation
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.6, ease: "easeOut" as const },
    }),
  };

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTeam() {
      setLoading(true);
      const res = await fetch("https://randomuser.me/api/?results=6");
      const data = await res.json();
      setTeamMembers(data.results);
      setLoading(false);
    }
    fetchTeam();
  }, []);

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-40">
      {/* Hero Section */}
      <motion.section
        className="-mx-4 sm:-mx-8 md:-mx-28 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6"
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                About Pick & Pack
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-100 leading-relaxed"
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
              className="relative h-96 rounded-2xl overflow-hidden"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div className="text-8xl text-white opacity-50">📦</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company History */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden bg-gray-100"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <div className="text-2xl font-bold text-gray-700">
                    Proudly Indonesian
                  </div>
                </div>
              </div>
            </motion.div>
            <div>
              <motion.h2
                className="text-4xl font-bold text-gray-900 mb-6"
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                Our History
              </motion.h2>
              <motion.div
                className="space-y-4 text-lg text-gray-600 leading-relaxed"
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
                <ul className="list-disc ml-6 mt-2">
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

      {/* Team Section */}
      <section className="-mx-4 sm:-mx-8 md:-mx-28 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              Our team combines creativity, technical expertise, and a passion
              for packaging.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-center text-xl text-gray-500">
                Loading team...
              </div>
            ) : (
              <>
                {teamMembers.map((member: TeamMember, i: number) => (
                  <motion.div
                    key={member.login.uuid}
                    className="bg-white rounded-2xl p-8 text-center shadow-md"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={member.picture.large}
                        alt={member.name.first}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name.first} {member.name.last}
                    </h3>
                    <div className="text-green-700 font-semibold mb-2">
                      {staticTeamInfo[i]?.position}
                    </div>
                    <p className="text-gray-600 text-base mb-2">
                      {member.location.country}
                    </p>
                    <p className="text-gray-600 text-base">
                      {staticTeamInfo[i]?.description}
                    </p>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovation & Collaboration
              </h3>
              <p className="text-gray-600 mb-6">
                We foster a creative environment where everyone’s ideas are
                valued. Our team works closely together to solve challenges and
                deliver the best results for our clients.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600 mb-6">
                We are committed to using eco-friendly materials and processes,
                and we encourage our clients to choose sustainable options for
                their packaging.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Customer Focus
              </h3>
              <p className="text-gray-600 mb-6">
                Our clients are at the heart of everything we do. We listen,
                adapt, and go the extra mile to ensure their packaging needs are
                met.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Growth & Learning
              </h3>
              <p className="text-gray-600 mb-6">
                We believe in continuous improvement, both as individuals and as
                a company. We invest in training and encourage our team to keep
                learning.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
