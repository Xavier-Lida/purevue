import type { MetadataRoute } from "next";
import { noelPackages } from "@/lib/site";
import { posts } from "@/lib/blog";

const BASE = "https://www.pure-vue.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    ...noelPackages.map((p) => ({ url: `${BASE}/forfaits/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${BASE}/blogue`, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({ url: `${BASE}/blogue/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
