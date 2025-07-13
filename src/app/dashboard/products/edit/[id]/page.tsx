"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";
import { fetchUrl } from "@/utils/fetchUrl";

type ProductType = {
  objectId: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string; // JSON stringified array
  utility: string;
  material: string;
};

const categories = [
  { value: "", label: "Select a category" },
  { value: "Makanan", label: "Makanan" },
  { value: "Minuman", label: "Minuman" },
  { value: "Pengiriman", label: "Pengiriman" },
];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductType>({
    objectId: "",
    name: "",
    slug: "",
    description: "",
    category: "",
    images: "",
    utility: "",
    material: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchUrl(`products/${productId}`);
        setFormData({
          ...data,
        });
      } catch {
        alert("Failed to fetch product data.");
        router.push("/dashboard/products");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId, router]);

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
      images: JSON.stringify(
        e.target.value
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean)
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      await fetchUrl(`products/${productId}`, "", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Product updated successfully!");
      router.push("/dashboard/products");
    } catch {
      alert("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <EditorGuard>
        <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
          <DashboardSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-500">
                Loading product data...
              </div>
            </div>
          </div>
        </main>
      </EditorGuard>
    );
  }

  // Parse images for display
  let images: string[] = [];
  try {
    images = formData.images ? JSON.parse(formData.images) : [];
  } catch {
    images = [];
  }

  return (
    <EditorGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-gray-700">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href="/dashboard/products" className="hover:text-gray-700">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Edit Product</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Edit Product
            </h1>
            <p className="text-gray-600">
              Update product information and details
            </p>
          </div>

          <div className="bg-white rounded-none shadow-md overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name *
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

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Slug *
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

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Images (comma separated URLs) *
                  </label>
                  <input
                    type="text"
                    id="images"
                    name="images"
                    value={images.join(", ")}
                    onChange={handleImagesChange}
                    className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, idx) => (
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

                <div>
                  <label
                    htmlFor="utility"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Utility *
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

                <div>
                  <label
                    htmlFor="material"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Material *
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
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <Link
                  href="/dashboard/products"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </EditorGuard>
  );
}
