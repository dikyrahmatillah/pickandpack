import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchUrl } from "@/utils/fetchUrl";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchUrl("journals", `?where=slug='${slug}'`);

    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      };
    }

    const journal = data[0];

    // Create a clean description from content (strip HTML and limit length)
    const cleanDescription =
      journal.content?.replace(/<[^>]*>/g, "").substring(0, 160) + "...";

    const imageUrl = journal.coverImage || "/images/hero/hero-2.webp";

    return {
      title: journal.title,
      description: cleanDescription,
      keywords: [
        journal.title,
        "packaging design",
        "design insights",
        "Pick & Pack journal",
        "packaging trends",
        "design article",
        ...(journal.tags
          ? journal.tags.split(",").map((tag: string) => tag.trim())
          : []),
      ],
      authors: [{ name: journal.createdBy || "Pick & Pack Team" }],
      openGraph: {
        title: `${journal.title} - Pick & Pack Journal`,
        description: cleanDescription,
        url: `https://pickandpack.vercel.app/journals/${slug}`,
        type: "article",
        publishedTime: journal.publishDate,
        authors: [journal.createdBy || "Pick & Pack Team"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: journal.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${journal.title} - TeaFlow Journal`,
        description: cleanDescription,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://teaflow.vercel.app/journals/${slug}`,
      },
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
}

interface JournalDetail {
  title: string;
  content: string;
  coverImage: string;
  createdBy: string;
  publishDate: string;
  tags?: string[];
  minutesRead?: number;
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchUrl("journals", `?where=slug='${slug}'`);

  if (!data || !Array.isArray(data) || data.length === 0) {
    notFound();
  }

  const journalDetailRaw = data[0];

  // Convert tags from comma-separated string to array
  const journalDetail: JournalDetail = {
    ...journalDetailRaw,
    tags: journalDetailRaw.tags
      ? journalDetailRaw.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [],
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 md:px-28 py-8 pt-10 md:pt-30">
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

      <article className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src={journalDetail.coverImage}
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
            {journalDetail.createdBy?.charAt(0) ?? "?"}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {journalDetail.createdBy}
            </div>
            <div className="text-gray-500 text-sm flex gap-2 items-center">
              <span>
                Published{" "}
                {new Date(journalDetail.publishDate).toLocaleDateString(
                  "id-ID",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                )}
              </span>
              {journalDetail.minutesRead && (
                <>
                  <span>•</span>
                  <span>{journalDetail.minutesRead} min read</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="w-full px-6 md:px-10 py-8">
          <div
            className="w-full text-gray-900 leading-relaxed
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:break-words [&_h1]:hyphens-auto [&_h1]:max-w-full
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:break-words [&_h2]:hyphens-auto [&_h2]:max-w-full
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:break-words [&_h3]:hyphens-auto [&_h3]:max-w-full
              [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:break-words [&_h4]:hyphens-auto [&_h4]:max-w-full
              [&_h5]:text-base [&_h5]:font-bold [&_h5]:mb-2 [&_h5]:break-words [&_h5]:hyphens-auto [&_h5]:max-w-full
              [&_h6]:text-sm [&_h6]:font-bold [&_h6]:mb-2 [&_h6]:break-words [&_h6]:hyphens-auto [&_h6]:max-w-full
              [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:break-words [&_p]:hyphens-auto [&_p]:max-w-full
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
              [&_li]:mb-1
              [&_strong]:font-bold
              [&_em]:italic
              [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto"
            dangerouslySetInnerHTML={{ __html: journalDetail.content }}
          />
          {/* Tags */}
          {journalDetail.tags && journalDetail.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
              {journalDetail.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

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
