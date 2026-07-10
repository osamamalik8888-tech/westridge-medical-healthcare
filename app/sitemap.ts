import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-posts";
import { allArticles } from "@/lib/knowledge-center";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/doctors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pharmacy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/diagnostic-laboratory", priority: 0.7, changeFrequency: "monthly" },
  { path: "/vaccination", priority: 0.6, changeFrequency: "monthly" },
  { path: "/corporate-healthcare", priority: 0.6, changeFrequency: "monthly" },
  { path: "/appointments", priority: 0.9, changeFrequency: "monthly" },
  { path: "/health-packages", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ai-health-assistant", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.4, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/knowledge-center", priority: 0.8, changeFrequency: "weekly" },
  { path: "/patient-resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.3, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const postEntries = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  const knowledgeCenterEntries = allArticles.map((article) => ({
    url: `${siteConfig.url}/knowledge-center/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.9 : article.status === "complete" ? 0.6 : 0.3,
  }));
  return [...staticEntries, ...postEntries, ...knowledgeCenterEntries];
}
