import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await fetch(
            `https://headwheel-us.backendless.app/api/data/user?where=email%3D'${credentials.email}'`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            const errorText = await res.text();
            console.error("API Error:", errorText);
            throw new Error("Login failed");
          }

          const users = await res.json();
          console.log("Fetched users data:", users);

          const user = Array.isArray(users) ? users[0] : users;

          if (!user) {
            console.error("User not found");
            return null;
          }

          if (user.password !== credentials.password) {
            console.error("Password mismatch");
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "VIEWER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
