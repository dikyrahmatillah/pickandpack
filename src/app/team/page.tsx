"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type TeamMember = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
  location: { country: string };
  email: string;
  phone: string;
};

export default function TeamPage() {
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

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" as const },
    }),
  };

  return (
    <main className="px-4 sm:px-8 md:px-28 py-2 pt-4 md:pt-8 mt-12">
      {/* Hero Section */}
      <motion.section
        className="-mx-4 sm:-mx-8 md:-mx-28 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Team
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Meet the talented individuals behind Pick & Pack. Our diverse team
              combines creativity, technical expertise, and passion to deliver
              exceptional packaging solutions.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Team Members Section */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-10">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-base text-gray-600 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              The creative minds and skilled hands that make Pick & Pack a
              leader in sustainable packaging solutions.
            </motion.p>
          </div>

          {loading ? (
            <div className="text-center text-base text-gray-500">
              Loading team...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.login.uuid}
                  className="bg-white rounded-xl p-4 border shadow-sm text-center"
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={member.picture.large}
                      alt={member.name.first + " " + member.name.last}
                      className="object-cover w-full h-full"
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {member.name.first} {member.name.last}
                  </h3>
                  <div className="text-green-700 font-semibold mb-2 text-xs">
                    {member.location.country}
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{member.email}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs">
                      Phone:
                    </h4>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {member.phone}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Company Values */}
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
            <div className="bg-white rounded-[15%] p-14 text-center shadow-md">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                💡
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Innovation
              </h3>
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
    </main>
  );
}
