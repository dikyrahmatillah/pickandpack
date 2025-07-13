"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";
import Image from "next/image";
import { fetchUrl } from "@/utils/fetchUrl";
import { Journal } from "@/types/journal";

export default function JournalsPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 8;

  const isAdmin = session?.user?.role === "admin";
  const isEditor =
    session?.user?.role === "admin" || session?.user?.role === "editor";

  useEffect(() => {
    setOffset(0);
    fetchJournals(0, true);
  }, []);

  const fetchJournals = async (start: number, reset = false) => {
    setLoading(true);
    try {
      const query = `?pageSize=${pageSize}&offset=${start}`;
      const data = await fetchUrl("journals", query);
      if (reset) {
        setJournals(data);
      } else {
        setJournals((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === pageSize);
    } catch (err) {
      throw new Error(`Failed to fetch journals: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextOffset = offset + pageSize;
    setOffset(nextOffset);
    fetchJournals(nextOffset);
  };

  const handleDeleteClick = (journalId: string) => {
    setDeleteId(journalId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetchUrl(`journals/${deleteId}`, "", { method: "DELETE" });
      setJournals((prev) => prev.filter((j) => j.objectId !== deleteId));
    } catch (err) {
      throw new Error("Failed to delete journal " + err);
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <RoleGuard>
      <main className="min-h-screen mt-20">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="fixed bottom-4 left-4 z-30 p-2 bg-white rounded-md shadow md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar */}
            <aside className="relative w-64 bg-white h-full shadow-md z-50">
              <button
                className="absolute top-4 right-4 p-2"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <DashboardSidebar />
            </aside>
          </div>
        )}

        {/* Responsive main content area */}
        <div className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {journals.map((journal) => (
              <div
                key={journal.objectId}
                className="bg-white shadow-md rounded-none overflow-hidden w-full"
              >
                <div className="h-48 bg-gray-200 relative w-full">
                  {journal.coverImage ? (
                    <Image
                      src={journal.coverImage}
                      alt={journal.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      Journal Cover Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {journal.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {journal.excerpt.slice(0, 50)}...
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(journal.publishDate).toLocaleDateString(
                        "id-ID"
                      )}
                    </span>
                    <div className="space-x-2">
                      <Link
                        href={`/journals/${journal.slug}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-none hover:bg-gray-200"
                      >
                        View
                      </Link>
                      {isEditor && (
                        <Link
                          href={`/dashboard/journals/edit/${journal.objectId}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-none hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                      )}
                      {isAdmin && (
                        <button
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-none hover:bg-red-200 cursor-pointer"
                          onClick={() => handleDeleteClick(journal.objectId)}
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

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                className="px-4 py-2 border border-gray-300 rounded-none text-gray-600 hover:bg-gray-50 cursor-pointer"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {/* Confirmation Modal */}
          {confirmOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-6">
                  Are you sure you want to delete this journal?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </RoleGuard>
  );
}
