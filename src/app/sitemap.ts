import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://invictus-club.vercel.app";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/merch",
    "/events",
    "/wins",
    "/hackathons",
    "/ideathons",
    "/offsite-project-dev",
    "/freelance-work",
    "/project-contests",
    "/paper-poster",
    "/research",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
