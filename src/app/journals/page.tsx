"use client";

import CallUsSection from "@/components/homepage/CallUsSection";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Example data with author and excerpt
const journals = [
  {
    date: "8 Juni 2023",
    title: "APA ITU MATCHA?",
    excerpt:
      "Matcha adalah teh hijau bubuk khas Jepang yang kaya manfaat. Pelajari sejarah, cara pembuatan, dan tips menikmatinya di sini.",
    author: "Admin Teaflow",
    url: "/journals/what-is-matcha",
    original: "https://teaflow.webflow.io/post/what-is-matcha",
    image: "/journals/matcha.jpg",
  },
  {
    date: "4 Mei 2023",
    title: "CARA MEMBUAT TEH DI ATAS API, MASAK MALAS",
    excerpt:
      "Cara sederhana membuat teh di atas api untuk hasil rasa yang berbeda. Cocok untuk kamu yang suka cara praktis.",
    author: "Admin Teaflow",
    url: "/journals/how-to-make-tea-on-fire-lazy-cooking",
    original:
      "https://teaflow.webflow.io/post/how-to-make-tea-on-fire-lazy-cooking",
    image: "/journals/tea-fire.jpg",
  },
  {
    date: "6 Maret 2023",
    title:
      "CHABAN (NAMPAN TEH), HUCHENG, CHACHUAN, DAN VARIAN NAMPAN TEH LAINNYA",
    excerpt:
      "Kenali berbagai jenis nampan teh dan fungsinya dalam tradisi minum teh. Dari Chaban hingga Chachuan.",
    author: "Admin Teaflow",
    url: "/journals/chaban-tea-tray-hucheng-chachuan-and-other-variants-of-tea-trays",
    original:
      "https://teaflow.webflow.io/post/chaban-tea-tray-hucheng-chachuan-and-other-variants-of-tea-trays",
    image: "/journals/chaban.jpg",
  },
  {
    date: "16 Januari 2023",
    title: "CARA SEDUH TEH PU-ERH (SHU) YANG BENAR",
    excerpt:
      "Panduan lengkap menyeduh teh Pu-erh (Shu) agar rasa dan aroma maksimal. Cocok untuk pemula maupun pecinta teh.",
    author: "Admin Teaflow",
    url: "/journals/how-to-brew-shu-ripe-pu-erh-tea-correctly",
    original:
      "https://teaflow.webflow.io/post/how-to-brew-shu-ripe-pu-erh-tea-correctly",
    image: "/journals/pu-erh.jpg",
  },
];

// Example filter state (by author, can be expanded)
const authors = ["All", ...Array.from(new Set(journals.map((j) => j.author)))];

export default function JournalPage() {
  const [authorFilter, setAuthorFilter] = useState("All");

  const filteredJournals =
    authorFilter === "All"
      ? journals
      : journals.filter((j) => j.author === authorFilter);

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-20 md:pt-26">
      <section className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">JOURNAL</h1>
          {/* Filtering */}
          <div className="flex gap-2">
            <label
              htmlFor="author"
              className="text-sm text-gray-700 self-center"
            >
              Filter by author:
            </label>
            <select
              id="author"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {filteredJournals.map((journal, idx) => (
            <div key={idx} className="flex items-start gap-4 border-b pb-4">
              <div className="w-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 h-16">
                <Image
                  src={journal.image}
                  alt={journal.title}
                  width={96}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1">
                  <span className="text-xs text-gray-500">{journal.date}</span>
                  <span className="hidden sm:inline text-xs text-gray-400 mx-2">
                    |
                  </span>
                  <span className="text-xs text-gray-500">
                    {journal.author}
                  </span>
                </div>
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1 leading-tight">
                  <Link href={journal.url}>{journal.title}</Link>
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mb-1">
                  {journal.excerpt}
                </p>
                <Link
                  href={journal.original}
                  target="_blank"
                  className="text-blue-600 hover:underline text-xs md:text-sm"
                >
                  Baca lebih lengkap
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-2">
          <Link
            href="/journals?page=2"
            className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition text-xs"
          >
            Halaman Selanjutnya
          </Link>
        </div>
        <CallUsSection />
      </section>
    </main>
  );
}
