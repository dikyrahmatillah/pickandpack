"use client";

import { useSession } from "next-auth/react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";

export default function ProductsPage() {
  const { data: session } = useSession();
  const products = [
    {
      id: 1,
      name: "Premium Tea Box",
      description:
        "Elegant packaging solution for premium tea brands. Sustainable materials with custom printing options.",
      price: 12.99,
      category: "Packaging",
      imageUrl: "/public/images/products/burger-box-1.webp",
    },
    {
      id: 2,
      name: "Eco Food Container",
      description:
        "Environmentally friendly food containers made from biodegradable materials. Perfect for takeout meals.",
      price: 8.5,
      category: "Containers",
      imageUrl: "/public/images/products/burger-box-2.webp",
    },
    {
      id: 3,
      name: "Drink Cup Set",
      description:
        "High-quality paper cups for hot and cold beverages. Available in multiple sizes with custom branding options.",
      price: 15.99,
      category: "Cups",
      imageUrl: "/public/images/products/coaster-1.webp",
    },
    {
      id: 4,
      name: "Food Delivery Bag",
      description:
        "Insulated food delivery bags that keep food warm and secure during transport. Ideal for delivery services.",
      price: 9.99,
      category: "Bags",
      imageUrl: "/public/images/products/food-bag.webp",
    },
  ];

  const isAdmin = session?.user?.role === "admin";
  const isEditor =
    session?.user?.role === "admin" || session?.user?.role === "editor";

  return (
    <RoleGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Products
              </h1>
              <p className="text-gray-600">View and manage product listings</p>
            </div>
            {isEditor && (
              <Link
                href="/dashboard/products/new"
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
                onChange={() =>
                  alert("Filter functionality would be implemented here")
                }
              >
                <option value="">All Categories</option>
                <option value="packaging">Packaging</option>
                <option value="cups">Cups</option>
                <option value="containers">Containers</option>
                <option value="bags">Bags</option>
              </select>
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border border-gray-300 rounded-none"
                onChange={() =>
                  alert("Sort functionality would be implemented here")
                }
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-none overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Product Image
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gray-900 font-bold mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/products/${product.id}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-none hover:bg-gray-200"
                    >
                      View Details
                    </Link>
                    <div className="space-x-2">
                      {isEditor && (
                        <Link
                          href={`/dashboard/products/edit/${product.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-none hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                      )}
                      {isAdmin && (
                        <button
                          className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-none hover:bg-red-200"
                          onClick={() =>
                            alert(
                              "Delete functionality would be implemented here"
                            )
                          }
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

          <div className="mt-8 text-center">
            <button className="px-4 py-2 border border-gray-300 rounded-none text-gray-600 hover:bg-gray-50">
              Load More
            </button>
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
