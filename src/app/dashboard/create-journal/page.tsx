"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import QuillEditor from "@/components/dashboard/QuillEditor";
import { quillToText, cleanQuillHtml, isQuillEmpty } from "@/lib/quillUtils";
import { motion } from "framer-motion";

export default function CreateJournalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    categories: [] as string[],
    coverImage: "",
    excerpt: "",
    publishDate: "",
    status: "draft" as "draft" | "published",
  });

  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addCategory = () => {
    if (
      categoryInput.trim() &&
      !formData.categories.includes(categoryInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
      setCategoryInput("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (category) => category !== categoryToRemove
      ),
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

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const canProceedToStep2 =
    formData.title.trim() &&
    formData.content.trim() &&
    !isQuillEmpty(formData.content);
  const canSubmit = canProceedToStep2 && formData.excerpt.trim();

  return (
    <EditorGuard>
      <main className="min-h-screen bg-gray-50 mt-50">
        <DashboardSidebar />

        <div className="ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create New Blog Post
                </h1>
                <p className="text-gray-600">
                  Create engaging content with our modern editor
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-8 h-1 ${
                    currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <div
                  className={`w-8 h-1 ${
                    currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info & Content */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Title Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Article Title
                  </h2>
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
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter an engaging title for your blog post..."
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.title.length}/100 characters
                    </p>
                  </div>
                </div>

                {/* Content Editor Only */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Write Your Content
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <QuillEditor
                      value={formData.content}
                      onChange={handleContentChange}
                      placeholder="Start writing your amazing blog post..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Use the toolbar above to format your content
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedToStep2}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Details →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Metadata & SEO */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Article Details
                  </h2>

                  <div className="space-y-6">
                    {/* Excerpt */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="excerpt"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Excerpt *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              formData.content &&
                              !isQuillEmpty(formData.content)
                            ) {
                              const plainText = quillToText(formData.content);
                              const autoExcerpt =
                                plainText.slice(0, 297) +
                                (plainText.length > 297 ? "..." : "");
                              setFormData((prev) => ({
                                ...prev,
                                excerpt: autoExcerpt,
                              }));
                            } else {
                              alert(
                                "Please write some content first before generating an excerpt."
                              );
                            }
                          }}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Auto-generate
                        </button>
                      </div>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write a compelling summary of your blog post..."
                        required
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        {formData.excerpt.length}/300 characters
                      </p>
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
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.coverImage && (
                        <div className="mt-3">
                          <Image
                            src={formData.coverImage}
                            alt="Cover preview"
                            width={800}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Add a tag and press Enter"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-blue-600 hover:text-blue-800"
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
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addCategory())
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Add a category and press Enter"
                        />
                        <button
                          type="button"
                          onClick={addCategory}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.categories.map((category, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {category}
                            <button
                              type="button"
                              onClick={() => removeCategory(category)}
                              className="text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    ← Back to Content
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Continue to Publish →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Publishing Options */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Publishing Options
                  </h2>

                  <div className="space-y-6">
                    {/* Status */}
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Save as Draft</option>
                        <option value="published">Publish Now</option>
                      </select>
                    </div>

                    {/* Publish Date */}
                    <div>
                      <label
                        htmlFor="publishDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Publish Date (Optional)
                      </label>
                      <input
                        type="datetime-local"
                        id="publishDate"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Leave empty to publish immediately
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Preview
                  </h2>

                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {formData.title || "Your title here..."}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {formData.excerpt || "Your excerpt here..."}
                    </p>

                    {formData.coverImage && (
                      <Image
                        src={formData.coverImage}
                        alt="Cover"
                        width={800}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex gap-2 mb-4">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          formData.content && !isQuillEmpty(formData.content)
                            ? cleanQuillHtml(formData.content)
                            : "<p class='text-gray-400 italic'>Your content will appear here...</p>",
                      }}
                    />
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    ← Back to Details
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !canSubmit}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSubmitting
                        ? "Creating..."
                        : formData.status === "published"
                        ? "Publish Blog Post"
                        : "Save as Draft"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </main>
    </EditorGuard>
  );
}
