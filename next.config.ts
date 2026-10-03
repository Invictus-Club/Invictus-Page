import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/create-profile",
        destination: "/",
        permanent: true,
      },
      {
        source: "/edit-socials",
        destination: "/",
        permanent: true,
      },
      {
        source: "/p/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
