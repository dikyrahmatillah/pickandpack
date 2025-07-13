"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { fetchUrl } from "@/utils/fetchUrl";

export default function CreateProductPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    images: [""],
    utility: "",
    description: "",
    material: "",
    size: "",
  });

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

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      images: e.target.value.split(",").map((img) => img.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare payload for Backendless (images as JSON string)
      const payload = {
        ...formData,
        images: JSON.stringify(formData.images.filter(Boolean)),
      };

      await fetchUrl("products", "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Product created successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      alert("Failed to create product. Please try again. " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen mt-20 ">
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

      {/* Main content area */}
      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">Add a new product to your catalog.</p>
        </div>
        <div>
          {/* forms */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Slug (unique, lowercase, hyphens)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 appearance-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Pengiriman">Pengiriman</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-400">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Images (comma separated URLs)
              </label>
              <input
                type="text"
                id="images"
                name="images"
                value={formData.images.join(", ")}
                onChange={handleImagesChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                placeholder="https://images.com/images/example-1.webp, https://images.com/images/example-2.webp"
                required
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images
                  .filter((img) => img.trim() !== "")
                  .map((img, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-20 h-20 object-cover border rounded"
                    />
                  ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="utility"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Utility
              </label>
              <input
                type="text"
                id="utility"
                name="utility"
                value={formData.utility}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl min-h-[100px]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="material"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-4 text-md text-white bg-blue-600 rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
