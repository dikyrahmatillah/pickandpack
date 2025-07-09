"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
type Props = {
  children: React.ReactNode;
};

// Inside EditorGuard

export function RoleGuard({ children }: Props) {
  const { data: session } = useSession();

  console.log("Session in EditorGuard:", session?.user.role);
  if (!session || !session.user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="mb-6">Please sign in to access this content.</p>
        <Link
          href="/login"
          className="bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminGuard({ children }: Props) {
  const { data: session } = useSession();
  if (!session || !session.user || session.user.role !== "admin") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Admin Access Required</h2>
        <p className="mb-6">
          You need administrator permissions to view this content.
        </p>
        <Link
          href="/dashboard"
          className="bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export function EditorGuard({ children }: Props) {
  const { data: session } = useSession();

  if (
    !session ||
    !session.user ||
    (session.user.role !== "admin" && session.user.role !== "editor")
  ) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Editor Access Required</h2>
        <p className="mb-6">
          You need editor permissions to view this content.
        </p>
        <Link
          href="/dashboard"
          className="bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export function ViewerGuard({ children }: Props) {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;

  // For viewer guard, we'll show different UI for viewer role
  if (!session || session.user.role !== "viewer") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="mb-6">You need to be logged in to view this content.</p>
        <Link
          href="/login"
          className="bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
