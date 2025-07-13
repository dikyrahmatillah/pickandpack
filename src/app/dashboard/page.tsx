"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalJournals: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    if (session?.user?.role === "viewer") {
      router.push("/dashboard/viewer");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        totalProducts: 24,
        totalJournals: 8,
        totalUsers: 3,
      });
    };

    fetchStats();
  }, []);

  return (
    <RoleGuard>
      <main className="min-h-screen mt-20">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="fixed bottom-4 left-4 z-30 p-2 bg-white rounded-md shadow md:hidden cursor-pointer"
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

        {/* Responsive main content area */}
        <div className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {session?.user?.name}!
            </p>
          </div>

          {/* Role-based Welcome Section */}
          <div className="mb-8">
            {session?.user?.role === "admin" && (
              <div className="bg-white border-l-4 border-indigo-500 p-4 mb-4 shadow-sm">
                <h3 className="text-lg font-medium text-indigo-800 mb-1">
                  Admin Dashboard
                </h3>
                <p className="text-gray-600">
                  You have full access to manage products, journals, and user
                  accounts. Use the quick actions below or navigate using the
                  sidebar.
                </p>
              </div>
            )}

            {session?.user?.role === "editor" && (
              <div className="bg-white border-l-4 border-green-500 p-4 mb-4 shadow-sm">
                <h3 className="text-lg font-medium text-green-800 mb-1">
                  Editor Dashboard
                </h3>
                <p className="text-gray-600">
                  You can create and edit content including journals and
                  products. Use the quick actions below to get started.
                </p>
              </div>
            )}

            {session?.user?.role === "viewer" && (
              <div className="bg-white border-l-4 border-blue-500 p-4 mb-4 shadow-sm">
                <h3 className="text-lg font-medium text-blue-800 mb-1">
                  Viewer Dashboard
                </h3>
                <p className="text-gray-600">
                  Welcome to your dashboard! You can view journals and products,
                  but cannot edit content. Check out the latest updates below.
                </p>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-none shadow-md border-t-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Products
                </h3>
                <span className="p-2 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalProducts}
              </div>
              <p className="text-gray-600 text-sm">Total products</p>
            </div>

            <div className="bg-white p-6 rounded-none shadow-md border-t-4 border-green-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Journals
                </h3>
                <span className="p-2 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.totalJournals}
              </div>
              <p className="text-gray-600 text-sm">Published journals</p>
            </div>

            {session?.user?.role === "admin" && (
              <div className="bg-white p-6 rounded-none shadow-md border-t-4 border-purple-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Users</h3>
                  <span className="p-2 bg-purple-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.totalUsers}
                </div>
                <p className="text-gray-600 text-sm">Registered users</p>
              </div>
            )}
          </div>

          {/* Recent Activity (this would be dynamic in a real app) */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="bg-white rounded-none shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        New Product Added
                      </p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Journal Updated
                      </p>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        New User Registered
                      </p>
                      <p className="text-sm text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </li>
                {/* New Activity 1 */}
                <li className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Product Inventory Updated
                      </p>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </li>
                {/* New Activity 2 */}
                <li className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-full mr-3">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        User Account Deactivated
                      </p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </RoleGuard>
  );
}
