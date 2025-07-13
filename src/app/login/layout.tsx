import { Metadata } from "next";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Pick & Pack account to access your dashboard, manage products, and create content.",
  keywords: [
    "login",
    "sign in",
    "Pick & Pack account",
    "dashboard access",
    "user authentication",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login - Pick & Pack",
    description:
      "Sign in to your Pick & Pack account to access your dashboard.",
    url: "https://pickandpack.vercel.app/login",
    type: "website",
  },
  alternates: {
    canonical: "https://pickandpack.vercel.app/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
