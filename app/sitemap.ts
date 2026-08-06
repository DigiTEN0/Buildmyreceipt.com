import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/lib/templates";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/generator`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE.url}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/legal/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const templates: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...core, ...templates];
}
