"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

// Mock User hints to help with login
const userHints = [
  { email: "admin@mail.com", label: "Admin" },
  { email: "editor@mail.com", label: "Editor" },
  { email: "viewer@mail.com", label: "Viewer" },
];

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHints, setShowHints] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      window.location.href = "/dashboard"; // Redirect to dashboard on successful login
    } catch (err) {
      setError("An error occurred during login: " + (err as Error).message);
      setIsLoading(false);
    }
  };

  // For easy login in development
  const setLoginCredentials = (email: string) => {
    setCredentials({ email, password: "" });
    if (email === "admin@mail.com") {
      setCredentials((prev) => ({ ...prev, password: "admin123" }));
    } else if (email === "editor@mail.com") {
      setCredentials((prev) => ({ ...prev, password: "editor123" }));
    } else if (email === "viewer@mail.com") {
      setCredentials((prev) => ({ ...prev, password: "viewer123" }));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-2 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-[15%] shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Sign In
        </h1>
        {error && (
          <div className="mb-3 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Development helper for quick logins */}
        {process.env.NODE_ENV !== "production" && (
          <div className="mt-4 border-t pt-2 border-gray-200">
            <p className="text-xs text-gray-600 mb-1">
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="text-gray-800 underline"
              >
                {showHints ? "Hide login hints" : "Show login hints"}
              </button>
            </p>
            {showHints && (
              <div className="grid grid-cols-1 gap-1 mt-1">
                {userHints.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => setLoginCredentials(user.email)}
                    className="text-xs text-left px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    {user.label}: {user.email}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <span className="mr-2">🔵</span> Google
          </button>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <span className="mr-2">🐙</span> GitHub
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/contact"
            className="font-medium text-gray-900 hover:underline"
          >
            Contact us to request access
          </Link>
        </p>
      </div>
    </main>
  );
}
