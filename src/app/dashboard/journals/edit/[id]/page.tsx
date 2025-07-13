"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import { Journal } from "@/types/journal";
import Image from "next/image";
import { fetchUrl } from "@/utils/fetchUrl";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper function to validate image URLs
const isValidImageUrl = (url: string): boolean => {
  if (!url || url.trim() === "") return false;
  if (url === "https://" || url === "http://") return false;

  try {
    const urlObj = new URL(url);
    return (
      (urlObj.protocol === "http:" || urlObj.protocol === "https:") &&
      urlObj.hostname !== "" &&
      urlObj.href.length > urlObj.protocol.length + 2
    );
  } catch {
    return false;
  }
};

export default function EditJournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [journalId, setJournalId] = useState<string>("");

  const [journal, setJournal] = useState<Journal>({
    objectId: "",
    createdBy: "",
    title: "",
    content: "",
    tags: [],
    categories: [],
    coverImage: "",
    excerpt: "",
    publishDate: "",
    status: "published",
    slug: "",
  });

  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Load journal data on mount
  useEffect(() => {
    const loadJournal = async () => {
      try {
        const { id } = await params;
        setJournalId(id);

        const data = await fetchUrl("journals", `?where=objectId='${id}'`);
        if (data && data[0]) {
          const journalData = data[0];
          setJournal({
            ...journalData,
            tags: journalData.tags
              ? journalData.tags
                  .split(",")
                  .map((t: string) => t.trim())
                  .filter(Boolean)
              : [],
            categories: journalData.categories
              ? journalData.categories
                  .split(",")
                  .map((c: string) => c.trim())
                  .filter(Boolean)
              : [],
          });
        }
      } catch (error) {
        console.error("Failed to load journal:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadJournal();
  }, [params]);

  const updateField = (field: keyof Journal, value: string) => {
    setJournal((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !journal.tags.includes(newTag.trim())) {
      setJournal((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setJournal((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addCategory = () => {
    if (
      newCategory.trim() &&
      !journal.categories.includes(newCategory.trim())
    ) {
      setJournal((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setJournal((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!journal.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!journal.excerpt.trim()) {
      alert("Please enter an excerpt");
      return;
    }

    if (journal.coverImage && !isValidImageUrl(journal.coverImage)) {
      alert("Please enter a valid cover image URL");
      return;
    }

    setLoading(true);

    try {
      const slug = journal.slug || slugify(journal.title);

      const updateData = {
        title: journal.title,
        excerpt: journal.excerpt,
        slug: slug,
        coverImage: journal.coverImage,
        tags: journal.tags.join(", "),
        categories: journal.categories.join(", "),
        status: journal.status,
      };

      await fetchUrl(`journals/${journalId}`, "", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      router.push("/dashboard/journals");
    } catch (error) {
      console.error("Failed to update journal:", error);
      alert("Failed to update journal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <EditorGuard>
        <main className="min-h-screen mt-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading journal...</div>
          </div>
        </main>
      </EditorGuard>
    );
  }

  return (
    <EditorGuard>
      <main className="min-h-screen mt-20">
        {/* Mobile Sidebar Toggle */}
        <button
          className="fixed bottom-4 left-4 z-30 p-2 bg-white rounded-md shadow md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
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

        <div className="flex-1 p-4 md:p-8 md:ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit Journal
              </h1>
              <p className="text-gray-600">Update journal article details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={journal.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter journal title"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  value={journal.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the journal article"
                  required
                />
              </div>

              {/* Cover Image */}
              <div>
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  value={journal.coverImage}
                  onChange={(e) => updateField("coverImage", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {journal.coverImage && isValidImageUrl(journal.coverImage) && (
                  <div className="mt-2">
                    <Image
                      src={journal.coverImage}
                      alt="Cover preview"
                      width={200}
                      height={150}
                      className="object-cover border border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  value={journal.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="url-friendly-slug (auto-generated from title if empty)"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {journal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addCategory())
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a category"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded-none hover:bg-green-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {journal.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full "
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Content Editing Note
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Content editing is not available in this interface. You
                        can update all other fields here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/journals")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Updating..." : "Update Journal"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </EditorGuard>
  );
}
