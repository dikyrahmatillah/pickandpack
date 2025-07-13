"use client";

import { useSession } from "next-auth/react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { fetchUrl } from "@/utils/fetchUrl";

type Product = {
  objectId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images?: string;
  slug?: string;
  utility?: string;
};

const categories = [
  { value: "", label: "All Categories" },
  { value: "Makanan", label: "Makanan" },
  { value: "Minuman", label: "Minuman" },
  { value: "Pengiriman", label: "Pengiriman" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductsPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 8;

  const isAdmin = session?.user?.role === "admin";
  const isEditor =
    session?.user?.role === "admin" || session?.user?.role === "editor";

  useEffect(() => {
    setOffset(0);
    fetchProducts(0, true);
    // eslint-disable-next-line
  }, [category, sort]);

  const fetchProducts = async (start: number, reset = false) => {
    setLoading(true);

    let query = `?pageSize=${pageSize}&offset=${start}`;
    if (category) {
      query += `&where=category%3D'${encodeURIComponent(category)}'`;
    }
    if (sort === "price-asc") query += "&sortBy=price%20asc";
    else if (sort === "price-desc") query += "&sortBy=price%20desc";
    else if (sort === "name-asc") query += "&sortBy=name%20asc";
    else if (sort === "name-desc") query += "&sortBy=name%20desc";
    else if (sort === "oldest") query += "&sortBy=created%20asc";
    else if (sort === "newest") query += "&sortBy=created%20desc";

    const data = await fetchUrl("products", query);

    if (reset) {
      setProducts(data);
    } else {
      setProducts((prev) => [...prev, ...data]);
    }
    setHasMore(data.length === pageSize);
    setLoading(false);
  };

  const handleLoadMore = () => {
    const nextOffset = offset + pageSize;
    setOffset(nextOffset);
    fetchProducts(nextOffset);
  };

  const handleDeleteClick = (productId: string) => {
    setDeleteId(productId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetchUrl(`products/${deleteId}`, "", { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.objectId !== deleteId));
    } catch (err) {
      throw new Error("Failed to delete product " + err);
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

        <div className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Products
              </h1>
              <p className="text-gray-600">View and manage product listings</p>
            </div>
            {isEditor && (
              <Link
                href="/dashboard/create-product"
                className="px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 flex items-center"
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
                Add New Product
              </Link>
            )}
          </div>

          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border border-gray-300 rounded-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border border-gray-300 rounded-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              let imageUrl = "";
              if (product.images) {
                try {
                  const imgs = JSON.parse(product.images);
                  imageUrl = imgs[0] || "";
                } catch {
                  imageUrl = "";
                }
              }
              return (
                <div
                  key={product.objectId}
                  className="bg-white shadow-md rounded-none overflow-hidden flex flex-col"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {imageUrl ? (
                      <Image
                        fill
                        src={imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                          {product.name}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-gray-900 font-bold mb-4">
                        {product.price ? `$${product.price.toFixed(2)}` : ""}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4">
                      <Link
                        href={`/products/${product.slug || product.objectId}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-none hover:bg-gray-200"
                      >
                        View Details
                      </Link>
                      <div className="space-x-2">
                        {isEditor && (
                          <Link
                            href={`/dashboard/products/edit/${product.objectId}`}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-none hover:bg-blue-200"
                          >
                            Edit
                          </Link>
                        )}
                        {isAdmin && (
                          <button
                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-none hover:bg-red-200 cursor-pointer"
                            onClick={() => handleDeleteClick(product.objectId)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  Are you sure you want to delete this product?
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
