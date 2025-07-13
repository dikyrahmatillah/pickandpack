"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TeamMember = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { large: string };
  location: { country: string };
  email: string;
  phone: string;
};

import { TeamInfo } from "@/data/teamInfo";

export default function TeamGrid() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? (
        <div className="text-center text-base text-gray-500 col-span-full">
          Loading team...
        </div>
      ) : (
        teamMembers.map((member, i) => (
          <motion.div
            key={member.login.uuid}
            className="bg-white rounded-2xl p-6 text-center shadow-md max-w-xs mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src={member.picture.large}
                alt={member.name.first}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {member.name.first} {member.name.last}
            </h3>
            <div className="text-green-700 font-semibold mb-1 text-sm">
              {TeamInfo[i]?.position}
            </div>
            <p className="text-gray-600 text-xs mb-1">
              {member.location.country}
            </p>
            <p className="text-gray-600 text-xs">{TeamInfo[i]?.description}</p>
          </motion.div>
        ))
      )}
    </div>
  );
}
