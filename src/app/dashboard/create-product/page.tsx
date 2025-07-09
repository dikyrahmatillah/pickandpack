"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    images: [""],
    utility: "",
    description: "",
    material: "",
    size: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      // In a real app, send formData to backend API
      console.log("Product to create:", formData);
      alert("Product created successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      alert("Failed to create product. Please try again." + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
      <DashboardSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">Add a new product to your catalog.</p>
        </div>
        <div className="bg-white p-6 rounded-none shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Slug (unique, lowercase, hyphens)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Images (comma separated URLs)
              </label>
              <input
                type="text"
                id="images"
                name="images"
                value={formData.images.join(", ")}
                onChange={handleImagesChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/images/products/example-1.webp, /images/products/example-2.webp"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="utility"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Utility
              </label>
              <input
                type="text"
                id="utility"
                name="utility"
                value={formData.utility}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
