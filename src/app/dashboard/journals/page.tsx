"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";
import Image from "next/image";

export default function JournalsPage() {
  const { data: session } = useSession();
  const [journals, setJournals] = useState([
    {
      id: 1,
      title: "The Art of Tea Packaging",
      excerpt:
        "Exploring innovative and sustainable packaging solutions for premium tea products.",
      coverImage: "/public/images/products/coaster-1.webp",
      publishDate: "2025-06-12",
    },
    {
      id: 2,
      title: "Sustainable Packaging Trends",
      excerpt:
        "How eco-friendly packaging is transforming the food and beverage industry.",
      coverImage: "/public/images/products/food-bag.webp",
      publishDate: "2025-05-24",
    },
    {
      id: 3,
      title: "Branding Through Packaging",
      excerpt:
        "Leveraging your packaging design to strengthen brand identity and recognition.",
      coverImage: "/public/images/products/coaster-2.webp",
      publishDate: "2025-04-18",
    },
  ]);

  const isAdmin = session?.user?.role === "admin";
  const isEditor =
    session?.user?.role === "admin" || session?.user?.role === "editor";

  return (
    <RoleGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Journals
              </h1>
              <p className="text-gray-600">View and manage journal articles</p>
            </div>
            {isEditor && (
              <Link
                href="/dashboard/create-journal"
                className="px-4 py-2 bg-green-600 text-white rounded-none hover:bg-green-700 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Journal
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journals.map((journal) => (
              <div
                key={journal.id}
                className="bg-white shadow-md rounded-none overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Journal Cover Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {journal.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{journal.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {journal.publishDate}
                    </span>
                    <div className="space-x-2">
                      <Link
                        href={`/journals/${journal.id}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-none hover:bg-gray-200"
                      >
                        View
                      </Link>
                      {isEditor && (
                        <Link
                          href={`/dashboard/journals/edit/${journal.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-none hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                      )}
                      {isAdmin && (
                        <button
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-none hover:bg-red-200"
                          onClick={() =>
                            alert(
                              "Delete functionality would be implemented here"
                            )
                          }
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="px-4 py-2 border border-gray-300 rounded-none text-gray-600 hover:bg-gray-50">
              Load More
            </button>
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
