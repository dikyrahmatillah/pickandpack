"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Team</h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                Meet the talented individuals behind Pick & Pack. Our diverse
                team combines creativity, technical expertise, and passion to
                deliver exceptional packaging solutions.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div className="text-8xl text-white opacity-50">👥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The creative minds and skilled hands that make Pick & Pack a
              leader in sustainable packaging solutions.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-xl text-gray-500">
              Loading team...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.login.uuid}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-80 bg-gray-200">
                    <Image
                      src={member.picture.large}
                      alt={member.name.first + " " + member.name.last}
                      className="object-cover w-full h-full"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name.first} {member.name.last}
                    </h3>
                    <div className="text-green-700 font-semibold mb-4">
                      {member.location.country}
                    </div>
                    <p className="text-gray-600 mb-4">{member.email}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Phone:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50 rounded-4xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our team and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                💡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly explore new materials, designs, and processes to
                create packaging solutions that exceed expectations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                🌱
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600">
                Environmental responsibility is at the core of everything we do,
                from material selection to production processes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Partnership
              </h3>
              <p className="text-gray-600">
                We build lasting relationships with our clients, treating their
                challenges as our own and celebrating their successes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
