"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  console.log("Session in DashboardSidebar:", session?.user.role);

  if (!session) {
    return null;
  }

  const isAdmin = session.user.role === "admin";
  const isEditor =
    session.user.role === "admin" || session.user.role === "editor";

  return (
    <aside className="w-64  pt-20 md:pt-40 bg-white h-full shadow-md fixed left-0 top-0 overflow-y-auto">
      {/* User profile */}
      <div className="p-6 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden mr-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                {session.user.name?.[0].toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{session.user.name}</p>
            <p className="text-sm text-gray-500 capitalize">
              {session.user.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="p-4">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
          Dashboard
        </p>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>
          </li>

          {/* Content Management */}
          {isEditor && (
            <>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-6 mb-4">
                Content
              </p>
              <li>
                <Link
                  href="/dashboard/journals"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
                  Journals
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/create-journal"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
                  New Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/products"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Products
                </Link>
              </li>
              {/* NEW: Add New Product and New Journal links for admin/editor */}
              <li>
                <Link
                  href="/dashboard/create-product"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
                  New Product
                </Link>
              </li>
            </>
          )}

          {/* Admin Settings */}
          {isAdmin && (
            <>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-6 mb-4">
                Admin
              </p>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
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
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t mt-auto">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-none w-full"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
