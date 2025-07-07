import Link from "next/link";
import Image from "next/image";
import journalDetail from "@/data/journalDetail";

export default function JournalDetailPage() {
  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      <nav className="mb-8 text-gray-500 text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/journals" className="hover:underline">
          Journal
        </Link>{" "}
        /{" "}
        <span className="text-gray-900 font-semibold">
          {journalDetail.title}
        </span>
      </nav>

      <article className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={journalDetail.image}
            alt={journalDetail.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 md:p-10 w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {journalDetail.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Metadata */}
        <div className="px-6 md:px-10 py-6 border-b flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white text-xl font-bold">
            {journalDetail.author.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {journalDetail.author}
            </div>
            <div className="text-gray-500 text-sm">{journalDetail.date}</div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 md:px-10 py-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900 text-lg">
            {journalDetail.content}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              Teh
            </span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              Chaban
            </span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              Perlengkapan Teh
            </span>
          </div>

          {/* Navigation */}
          <div className="mt-10 pt-6 border-t">
            <Link
              href="/journals"
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Kembali ke Daftar Journal
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
