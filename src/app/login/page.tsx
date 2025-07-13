"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userHints = [
  { email: "admin@mail.com", label: "Admin" },
  { email: "editor@mail.com", label: "Editor" },
  { email: "viewer@mail.com", label: "Viewer" },
];

// 1. Define Zod schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHints, setShowHints] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setError("An error occurred during login: " + (err as Error).message);
      setIsLoading(false);
    }
  };

  const setLoginCredentials = (email: string) => {
    setValue("email", email);
    if (email === "admin@mail.com") setValue("password", "admin123");
    else if (email === "editor@mail.com") setValue("password", "editor123");
    else if (email === "viewer@mail.com") setValue("password", "viewer123");
    else setValue("password", "");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              placeholder="your@email.com"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm cursor-pointer"
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
                className="text-gray-800 underline cursor-pointer"
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
                    className="text-xs text-left px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
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
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <span className="mr-2">🔵</span> Google
          </button>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <span className="mr-2">🐙</span> GitHub
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/contact"
            className="font-medium text-gray-900 hover:underline disable-link"
          >
            Contact us to request access
          </Link>
        </p>
      </div>
    </main>
  );
}
