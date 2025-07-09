"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import dynamic from "next/dynamic";

// Import ReactMarkdown dynamically to avoid SSR issues
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function CreateJournalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    categories: "",
    coverImage: "",
    excerpt: "",
  });

  // Helper function to insert Markdown formatting
  const insertMarkdown = (type: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = "";

    switch (type) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        newText = `*${selectedText || "italic text"}*`;
        break;
      case "heading":
        newText = `## ${selectedText || "Heading"}`;
        break;
      case "link":
        newText = `[${selectedText || "link text"}](url)`;
        break;
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`;
        break;
      case "list":
        newText = `\n- List item 1\n- List item 2\n- List item 3`;
        break;
      case "code":
        newText = selectedText ? `\`${selectedText}\`` : "```\ncode block\n```";
        break;
      default:
        return;
    }

    const newContent =
      textarea.value.substring(0, start) +
      newText +
      textarea.value.substring(end);

    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));

    // Set focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + newText.length;
      textarea.selectionEnd = start + newText.length;
    }, 10);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your backend API
      console.log("Journal data to submit:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message and redirect
      alert("Journal created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating journal:", error);
      alert("Failed to create journal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditorGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Blog Post
            </h1>
            <p className="text-gray-600">
              Add a new blog entry with Markdown content, tags, and categories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-none shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content (Markdown supported)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                  <div className="flex space-x-2 mb-2 sm:mb-0">
                    <button
                      type="button"
                      onClick={() => insertMarkdown("bold")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Bold (Ctrl+B)"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("italic")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Italic (Ctrl+I)"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("heading")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Heading (Ctrl+H)"
                    >
                      H
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("link")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Link (Ctrl+K)"
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("image")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Image (Ctrl+G)"
                    >
                      Img
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("list")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="List (Ctrl+L)"
                    >
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("code")}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none"
                      title="Code (Ctrl+Shift+C)"
                    >
                      Code
                    </button>
                  </div>
                </div>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[180px]"
                  placeholder="Write your blog content here. Markdown is supported."
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. tea, packaging, eco"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. News, Tips"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cover Image URL
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Excerpt
                </label>
                <input
                  type="text"
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Short summary of the blog post"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-none hover:bg-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Creating..." : "Create Blog"}
                </button>
              </div>
            </form>
          </div>

          {/* Live Markdown Preview */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
            <div className="prose max-w-none bg-white p-6 rounded-none shadow-md min-h-[300px] border border-gray-200">
              {formData.content ? (
                <ReactMarkdown>{formData.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">
                  Your formatted content will appear here as you type...
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </EditorGuard>
  );
}
