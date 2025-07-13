"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import QuillEditor from "@/components/dashboard/QuillEditor";
import { quillToText, cleanQuillHtml, isQuillEmpty } from "@/utils/quillUtils";
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

  // Check for incomplete URLs like "https://" or "http://"
  if (url === "https://" || url === "http://") return false;

  try {
    const urlObj = new URL(url);
    // Ensure it's a complete URL with a hostname
    return (
      (urlObj.protocol === "http:" || urlObj.protocol === "https:") &&
      urlObj.hostname !== "" &&
      urlObj.href.length > urlObj.protocol.length + 2 // More than just "https://"
    );
  } catch {
    return false;
  }
};

// Custom hooks
const useJournal = () => {
  const [Journal, setJournal] = useState<Journal>({
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

  const updateField = (field: keyof Journal, value: string) => {
    setJournal((prev) => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: "tags" | "categories", value: string) => {
    if (value.trim() && !Journal[field].includes(value.trim())) {
      setJournal((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const removeFromArray = (field: "tags" | "categories", value: string) => {
    setJournal((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  return { Journal, updateField, addToArray, removeFromArray };
};

// Components
const MobileSidebarToggle = ({ onClick }: { onClick: () => void }) => (
  <button
    className="fixed bottom-4 left-4 z-30 p-2 bg-white rounded-md shadow md:hidden"
    onClick={onClick}
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
);

const MobileSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) =>
  isOpen ? (
    <div className="fixed inset-0 z-40 flex md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      <aside className="relative w-64 bg-white h-full shadow-md z-50">
        <button
          className="absolute top-4 right-4 p-2"
          onClick={onClose}
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
  ) : null;

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center">
    {[1, 2].map((step) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= step
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {step}
        </div>
        {step < 2 && (
          <div
            className={`flex-1 h-1 ml-2 ${
              currentStep >= step + 1 ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const TagInput = ({
  value,
  onChange,
  onAdd,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder: string;
}) => (
  <div className="flex gap-2 mb-2">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
    />
    <button
      type="button"
      onClick={onAdd}
      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
    >
      Add
    </button>
  </div>
);

const TagList = ({
  items,
  onRemove,
  colorClass,
}: {
  items: string[];
  onRemove: (item: string) => void;
  colorClass: string;
}) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, index) => (
      <span
        key={index}
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${colorClass}`}
      >
        {item}
        <button
          type="button"
          onClick={() => onRemove(item)}
          className="hover:opacity-80"
        >
          ×
        </button>
      </span>
    ))}
  </div>
);

const PreviewCard = ({ Journal }: { Journal: Journal }) => {
  const calculateReadingTime = (content: string) => {
    if (!content || isQuillEmpty(content)) return 1;
    const plainText = quillToText(content);
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const readingTime = calculateReadingTime(Journal.content);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Preview</h2>
      <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white w-full max-w-full overflow-x-auto shadow-sm">
        {/* Blog Post Header */}
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight break-words">
            {Journal.title || "Your title here..."}
          </h3>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed break-words">
            {Journal.excerpt || "Your excerpt here..."}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>Published on {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Tags */}
          {Journal.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Journal.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Categories */}
          {Journal.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Journal.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover Image */}
        {Journal.coverImage && isValidImageUrl(Journal.coverImage) && (
          <div className="mb-6">
            <Image
              src={Journal.coverImage}
              alt="Cover"
              className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              width={800}
              height={192}
              unoptimized
              // removed: fill
            />
          </div>
        )}

        {/* Content with proper styling */}
        <div className="border-t border-gray-100 pt-6">
          <div
            className="
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-6 [&_h1]:leading-tight
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:leading-tight
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:leading-tight
              [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gray-900 [&_h4]:mb-2 [&_h4]:mt-4
              [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-gray-900 [&_h5]:mb-2 [&_h5]:mt-4
              [&_h6]:text-sm [&_h6]:font-bold [&_h6]:text-gray-900 [&_h6]:mb-2 [&_h6]:mt-4
              [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
              [&_strong]:text-gray-900 [&_strong]:font-semibold
              [&_em]:text-gray-700 [&_em]:italic
              [&_u]:underline
              [&_s]:line-through
              [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc
              [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal
              [&_li]:mb-2 [&_li]:text-gray-700
              [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:bg-blue-50 [&_blockquote]:text-gray-700 [&_blockquote]:italic [&_blockquote]:my-4
              [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:text-gray-800 [&_code]:font-mono
              [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
              [&_a]:text-blue-600 [&_a]:no-underline [&_a]:hover:underline
              [&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto
              [&_hr]:border-gray-200 [&_hr]:my-8 [&_hr]:border-t
              [&_table]:text-sm [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse
              [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:p-2 [&_th]:border [&_th]:border-gray-200
              [&_td]:text-gray-700 [&_td]:p-2 [&_td]:border [&_td]:border-gray-200
              [&_.ql-align-center]:text-center
              [&_.ql-align-right]:text-right
              [&_.ql-align-justify]:text-justify
              [&_.ql-indent-1]:ml-6
              [&_.ql-indent-2]:ml-12
              [&_.ql-indent-3]:ml-18
              [&_.ql-indent-4]:ml-24
              [&_.ql-indent-5]:ml-30
              [&_.ql-indent-6]:ml-36
              [&_.ql-indent-7]:ml-42
              [&_.ql-indent-8]:ml-48
              [&_.ql-font-serif]:font-serif
              [&_.ql-font-monospace]:font-mono
              [&_.ql-size-small]:text-sm
              [&_.ql-size-large]:text-lg
              [&_.ql-size-huge]:text-xl
              text-base leading-7 break-words
            "
            dangerouslySetInnerHTML={{
              __html:
                Journal.content && !isQuillEmpty(Journal.content)
                  ? cleanQuillHtml(Journal.content)
                  : "<p class='text-gray-400 italic text-center py-8'>Your content will appear here...</p>",
            }}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 mt-8 pt-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>End of article</span>
            <div className="flex gap-4">
              <span>👍 Like</span>
              <span>💬 Comment</span>
              <span>📤 Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export default function CreateJournalPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { Journal, updateField, addToArray, removeFromArray } = useJournal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  // Validation
  const canProceedToStep2 =
    Journal.title.trim() &&
    Journal.content.trim() &&
    !isQuillEmpty(Journal.content);
  const canSubmit = canProceedToStep2 && Journal.excerpt.trim();

  const calculateReadingTime = (content: string) => {
    if (!content || isQuillEmpty(content)) return 1;
    const plainText = quillToText(content);
    const wordCount = plainText.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof Journal, value);

    // Auto-generate slug when title changes
    if (name === "title") {
      updateField("slug", slugify(value));
    }
  };

  const generateExcerpt = () => {
    if (Journal.content && !isQuillEmpty(Journal.content)) {
      const plainText = quillToText(Journal.content);
      const autoExcerpt =
        plainText.slice(0, 297) + (plainText.length > 297 ? "..." : "");
      updateField("excerpt", autoExcerpt);
    } else {
      alert("Please write some content first before generating an excerpt.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const minutesRead = calculateReadingTime(Journal.content);

      const data = {
        ...Journal,
        tags: Journal.tags.join(","),
        categories: Journal.categories.join(","),
        publishDate: new Date().toISOString(),
        createdBy: session?.user.name,
        minutesRead,
      };

      await fetchUrl("journals", "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert("Journal created successfully");
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
      <main className="min-h-screen mt-20">
        <MobileSidebarToggle onClick={() => setSidebarOpen(true)} />
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="ml-0 md:ml-64 p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Create New Blog Post
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Create engaging content with our modern editor
                </p>
              </div>
              <StepIndicator currentStep={currentStep} />
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
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
                      value={Journal.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter an engaging title for your blog post..."
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {Journal.title.length}/100 characters
                    </p>
                  </div>
                </div>

                {/* Slug Section */}
                <div className="mt-4">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={Journal.slug}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="auto-generated-from-title"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be used in the URL:{" "}
                    <span className="text-blue-600">
                      /journals/{Journal.slug || "your-slug"}
                    </span>
                  </p>
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Write Your Content
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <QuillEditor
                      key="journal-content-editor"
                      value={Journal.content}
                      onChange={(content) => updateField("content", content)}
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
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Details →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Metadata & Preview */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Article Details & Preview
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
                          onClick={generateExcerpt}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Auto-generate
                        </button>
                      </div>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        value={Journal.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write a compelling summary of your blog post..."
                        required
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        {Journal.excerpt.length}/300 characters
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
                        value={Journal.coverImage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                      {Journal.coverImage &&
                        isValidImageUrl(Journal.coverImage) && (
                          <div className="mt-3">
                            <Image
                              src={Journal.coverImage}
                              alt="Cover preview"
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              width={800}
                              height={192}
                              unoptimized
                              // removed: fill
                            />
                          </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <TagInput
                        value={tagInput}
                        onChange={setTagInput}
                        onAdd={() => {
                          addToArray("tags", tagInput);
                          setTagInput("");
                        }}
                        placeholder="Add a tag and press Enter"
                      />
                      <TagList
                        items={Journal.tags}
                        onRemove={(tag) => removeFromArray("tags", tag)}
                        colorClass="bg-blue-100 text-blue-800"
                      />
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categories
                      </label>
                      <TagInput
                        value={categoryInput}
                        onChange={setCategoryInput}
                        onAdd={() => {
                          addToArray("categories", categoryInput);
                          setCategoryInput("");
                        }}
                        placeholder="Add a category and press Enter"
                      />
                      <TagList
                        items={Journal.categories}
                        onRemove={(category) =>
                          removeFromArray("categories", category)
                        }
                        colorClass="bg-green-100 text-green-800"
                      />
                    </div>

                    {/* Preview */}
                    <PreviewCard Journal={Journal} />
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    ← Back to Content
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
                      {isSubmitting ? "Creating..." : "Publish Blog Post"}
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
