import NextAuth from "next-auth";
import { authOptions } from "./options";

// This approach works in Next.js 13+ with the App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
