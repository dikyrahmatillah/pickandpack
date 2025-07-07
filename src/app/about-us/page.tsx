import CallUsSection from "@/components/homepage/CallUsSection";

export default function AboutPage() {
  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About Pick & Pack
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                We create custom packaging boxes that help brands stand out and
                protect their products, with a focus on quality, creativity, and
                sustainability.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div className="text-8xl text-white opacity-50">📦</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <div className="text-2xl font-bold text-gray-700">
                    Proudly Indonesian
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines creativity, technical expertise, and a passion
              for packaging.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                👩‍💼
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ayu Pratiwi
              </h3>
              <div className="text-green-700 font-semibold mb-2">
                Co-Founder & CEO
              </div>
              <p className="text-gray-600 text-base">
                Ayu leads the vision and growth of Pick & Pack, ensuring every
                client gets the best packaging experience.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                👨‍🎨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Budi Santoso
              </h3>
              <div className="text-green-700 font-semibold mb-2">
                Head of Design
              </div>
              <p className="text-gray-600 text-base">
                Budi brings creative ideas to life, designing unique packaging
                that reflects each brand’s identity.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                👨‍💻
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Rizky Maulana
              </h3>
              <div className="text-green-700 font-semibold mb-2">
                Production Manager
              </div>
              <p className="text-gray-600 text-base">
                Rizky oversees the production process, making sure every box
                meets our standards for quality and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
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
      </section>

      {/* CTA Section */}
      <CallUsSection />
    </main>
  );
}
