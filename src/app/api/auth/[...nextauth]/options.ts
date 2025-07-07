import { JWT } from "next-auth/jwt";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
    };
  }

  interface User {
    role?: "ADMIN" | "EDITOR" | "VIEWER";
    id?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "EDITOR" | "VIEWER";
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          String(credentials.password),
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: import("next-auth").User;
    }) {
      // Include user role in JWT token when signing in
      if (user) {
        // Use type assertion to access the custom properties we've added
        const customUser = user as {
          role?: "ADMIN" | "EDITOR" | "VIEWER";
          id?: string;
        };
        token.role = customUser.role || "VIEWER";
        token.id = customUser.id;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      // Pass role to the client
      if (session?.user) {
        // Use type assertion to modify the session.user object
        const customSession = session as DefaultSession & {
          user: {
            id: string;
            role: "ADMIN" | "EDITOR" | "VIEWER";
            name?: string | null;
            email?: string | null;
            image?: string | null;
          };
        };
        customSession.user.role = token.role as "ADMIN" | "EDITOR" | "VIEWER";
        customSession.user.id = token.id as string;
      }
      return session;
    },
  },
};
