"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { EditorGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";

// Define the product type
interface ProductType {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  minimumOrder: number;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProductType>({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
    stock: 0,
    minimumOrder: 0,
  });

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock product data - this would come from your API
        const mockProduct = {
          id: productId,
          name: "Premium Tea Box",
          description:
            "Elegant packaging solution for premium tea brands. Our sustainable materials provide excellent protection while maintaining a luxurious feel.",
          price: 12.99,
          category: "Packaging",
          imageUrl: "/public/images/products/burger-box-1.webp",
          stock: 250,
          minimumOrder: 100,
        };

        setFormData(mockProduct as ProductType);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle numeric values
    if (name === "price" || name === "stock" || name === "minimumOrder") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd update the product via API
      console.log("Saving product:", formData);

      alert("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
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
              Update product information and inventory
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
                    <option value="">Select a category</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Cups">Cups</option>
                    <option value="Containers">Containers</option>
                    <option value="Bags">Bags</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Image URL *
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="minimumOrder"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Order Quantity *
                  </label>
                  <input
                    type="number"
                    id="minimumOrder"
                    name="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={handleChange}
                    min="1"
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
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
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
