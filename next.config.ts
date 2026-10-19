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
        source: "/achievements",
        destination: "/wins",
        permanent: true,
      },
      {
        source: "/achievement",
        destination: "/wins",
        permanent: true,
      },
      {
        source: "/hall-of-fame",
        destination: "/wins",
        permanent: true,
      },
      {
        source: "/halloffame",
        destination: "/wins",
        permanent: true,
      },
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
