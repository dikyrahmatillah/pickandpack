import Link from "next/link";
import CallUsSection from "@/components/homepage/CallUsSection";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Ayu Pratiwi",
    role: "Co-Founder & CEO",
    bio: "Ayu brings over 15 years of experience in the packaging industry. She leads the vision and growth of Pick & Pack, ensuring every client gets the best packaging experience while maintaining our commitment to sustainability.",
    image: "/images/team/ayu.jpg", // Replace with actual image path
    expertise: [
      "Strategic Planning",
      "Client Relations",
      "Sustainable Business",
    ],
    education: "MBA, University of Indonesia",
    email: "ayu@pickandpack.id",
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Head of Design",
    bio: "With a background in industrial design, Budi leads our creative team. He combines artistic vision with practical engineering to create packaging solutions that are both beautiful and functional.",
    image: "/images/team/budi.jpg", // Replace with actual image path
    expertise: ["Product Design", "Material Innovation", "Brand Identity"],
    education: "BFA in Industrial Design, Institut Teknologi Bandung",
    email: "budi@pickandpack.id",
  },
  {
    id: 3,
    name: "Rizky Maulana",
    role: "Production Manager",
    bio: "Rizky oversees our production facilities with meticulous attention to detail. He ensures that every product meets our high standards for quality and sustainability before reaching our clients.",
    image: "/images/team/rizky.jpg", // Replace with actual image path
    expertise: [
      "Quality Control",
      "Supply Chain Management",
      "Process Optimization",
    ],
    education: "B.Eng in Manufacturing, Universitas Gadjah Mada",
    email: "rizky@pickandpack.id",
  },
  {
    id: 4,
    name: "Siti Rahayu",
    role: "Marketing Director",
    bio: "Siti handles our brand messaging and client outreach with creativity and strategic insight. She has successfully positioned Pick & Pack as a leader in sustainable packaging solutions.",
    image: "/images/team/siti.jpg", // Replace with actual image path
    expertise: ["Digital Marketing", "Brand Strategy", "Content Creation"],
    education: "Bachelor in Communications, Universitas Padjadjaran",
    email: "siti@pickandpack.id",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    role: "Materials Specialist",
    bio: "Eko researches and sources sustainable materials for our packaging solutions. His expertise ensures we stay at the forefront of eco-friendly packaging innovation.",
    image: "/images/team/eko.jpg", // Replace with actual image path
    expertise: [
      "Material Research",
      "Sustainability Assessment",
      "Vendor Relations",
    ],
    education:
      "M.Sc. in Environmental Engineering, Institut Teknologi Sepuluh Nopember",
    email: "eko@pickandpack.id",
  },
  {
    id: 6,
    name: "Dewi Lestari",
    role: "Client Success Manager",
    bio: "Dewi ensures our clients receive exceptional service from initial consultation through final delivery. She builds strong relationships that turn first-time clients into loyal partners.",
    image: "/images/team/dewi.jpg", // Replace with actual image path
    expertise: [
      "Client Relations",
      "Project Management",
      "Customer Experience",
    ],
    education: "Bachelor in Business Administration, Universitas Indonesia",
    email: "dewi@pickandpack.id",
  },
];

export default function TeamPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-80 bg-gray-200">
                  {/* If you have actual images, use this instead of the placeholder */}
                  {/* <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  /> */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100">
                    <span className="text-6xl">
                      {member.id % 3 === 0
                        ? "👨‍💻"
                        : member.id % 2 === 0
                        ? "👨‍🎨"
                        : "👩‍💼"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-green-700 font-semibold mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 mb-4">{member.bio}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm">
                    <p className="mb-1">
                      <strong>Education:</strong> {member.education}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      <a
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {member.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  We&#39;re always looking for talented individuals who are
                  passionate about sustainable packaging and design.
                </p>
                <p>
                  If you&#39;re creative, detail-oriented, and committed to
                  making a difference through innovative packaging solutions,
                  we&#39;d love to hear from you.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors"
                  >
                    View Open Positions
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <div className="text-2xl font-bold text-gray-700">
                    Grow With Us
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
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

      {/* CTA Section */}
      <CallUsSection />
    </main>
  );
}
