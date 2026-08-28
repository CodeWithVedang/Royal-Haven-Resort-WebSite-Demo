import type { MetadataRoute } from "next";
import { roomSlugs } from "@/data/rooms";
import { site } from "@/lib/site";

/** Static export of every route the site actually serves. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/rooms", priority: 0.9, changeFrequency: "weekly" },
    { path: "/booking", priority: 0.9, changeFrequency: "daily" },
    { path: "/weddings", priority: 0.9, changeFrequency: "monthly" },
    { path: "/experiences", priority: 0.8, changeFrequency: "monthly" },
    { path: "/dining", priority: 0.8, changeFrequency: "monthly" },
    { path: "/wellness", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  const rooms = roomSlugs().map((slug) => ({
    path: `/rooms/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...pages, ...rooms].map((entry) => ({
    url: `${site.url}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
