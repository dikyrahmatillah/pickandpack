"use client";

import { useSession } from "next-auth/react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { ViewerGuard } from "@/components/auth/RoleGuard";
import Link from "next/link";

export default function ViewerDashboardPage() {
  const { data: session } = useSession();

  return (
    <ViewerGuard>
      <main className="px-4 sm:px-8 md:px-28 py-8 pt-30 md:pt-50">
        <DashboardSidebar />

        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Viewer Dashboard
            </h1>
            <p className="text-gray-600">Welcome, {session?.user?.name}!</p>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-none border border-blue-100 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Welcome to Pick & Pack
            </h2>
            <p className="text-gray-700 mb-3">
              As a viewer, you have access to browse our products and journals.
              Explore our content and let us know if you have any questions.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact Us &rarr;
            </Link>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-none shadow-md border-t-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Our Products
              </h3>
              <p className="text-gray-600 mb-4">
                Browse our extensive collection of packaging solutions for your
                business. From custom tea boxes to eco-friendly food containers.
              </p>
              <Link
                href="/products"
                className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-none hover:bg-blue-200"
              >
                View Products
              </Link>
            </div>

            <div className="bg-white p-6 rounded-none shadow-md border-t-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Latest Journals
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with industry trends and insights through our
                regularly updated journal articles.
              </p>
              <Link
                href="/journals"
                className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-none hover:bg-green-200"
              >
                Read Journals
              </Link>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white p-6 rounded-none shadow-md mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Profile
            </h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xl mr-4">
                {session?.user?.name?.[0].toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-medium">{session?.user?.name}</p>
                <p className="text-gray-500 text-sm">{session?.user?.email}</p>
                <p className="text-gray-500 text-sm capitalize">
                  Role: {session?.user?.role}
                </p>
              </div>
            </div>
            <div className="border-t pt-4">
              <Link
                href="/dashboard/profile"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit Profile &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ViewerGuard>
  );
}
