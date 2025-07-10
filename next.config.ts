import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://cdn.prod.website-files.com/**"),
      new URL("https://randomuser.me/**"),
      new URL("https://example.com/**"),
      new URL("https://pickandpack.id/**"),
      new URL("https://pickandpack.id/image/career/**"),
    ],
  },
};

export default nextConfig;
