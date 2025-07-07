"use client";

import { AuthProvider } from "@/providers/AuthProvider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
