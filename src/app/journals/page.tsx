import CallUsSection from "@/components/homepage/CallUsSection";
import Image from "next/image";
import Link from "next/link";

const journals = [
  {
    date: "8 Juni 2023",
    title: "APA ITU MATCHA?",
    url: "/journals/what-is-matcha",
    original: "https://teaflow.webflow.io/post/what-is-matcha",
    image: "/journals/matcha.jpg",
  },
  {
    date: "4 Mei 2023",
    title: "CARA MEMBUAT TEH DI ATAS API, MASAK MALAS",
    url: "/journals/how-to-make-tea-on-fire-lazy-cooking",
    original:
      "https://teaflow.webflow.io/post/how-to-make-tea-on-fire-lazy-cooking",
    image: "/journals/tea-fire.jpg",
  },
  {
    date: "6 Maret 2023",
    title:
      "CHABAN (NAMPAN TEH), HUCHENG, CHACHUAN, DAN VARIAN NAMPAN TEH LAINNYA",
    url: "/journals/chaban-tea-tray-hucheng-chachuan-and-other-variants-of-tea-trays",
    original:
      "https://teaflow.webflow.io/post/chaban-tea-tray-hucheng-chachuan-and-other-variants-of-tea-trays",
    image: "/journals/chaban.jpg",
  },
  {
    date: "16 Januari 2023",
    title: "CARA SEDUH TEH PU-ERH (SHU) YANG BENAR",
    url: "/journals/how-to-brew-shu-ripe-pu-erh-tea-correctly",
    original:
      "https://teaflow.webflow.io/post/how-to-brew-shu-ripe-pu-erh-tea-correctly",
    image: "/journals/pu-erh.jpg",
  },
];

export default function JournalPage() {
  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      <section className="max-w-full mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">JOURNAL</h1>
        <div className="flex flex-col gap-6">
          {journals.map((journal, idx) => (
            <div key={idx} className="flex items-center gap-8 border-b pb-6">
              <div className="w-40 flex-shrink-0 text-gray-500 text-lg md:text-xl">
                {journal.date}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  <Link href={journal.url}>{journal.title}</Link>
                </h2>
                <Link
                  href={journal.original}
                  target="_blank"
                  className="text-blue-600 hover:underline text-base md:text-lg"
                >
                  Baca lebih lengkap
                </Link>
              </div>
              <div className="w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={journal.image}
                  alt={journal.title}
                  width={250}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/journals?page=2"
            className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Halaman Selanjutnya
          </Link>
        </div>
        <CallUsSection />
      </section>
    </main>
  );
}
