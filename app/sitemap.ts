import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/lib/templates";
import { LOCALES } from "@/lib/locales";
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

  const localeHubs: MetadataRoute.Sitemap = LOCALES.map((l) => ({
    url: `${SITE.url}/${l.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const localeTemplates: MetadataRoute.Sitemap = LOCALES.flatMap((l) =>
    l.templates.map((t) => ({
      url: `${SITE.url}/${l.path}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...core, ...templates, ...localeHubs, ...localeTemplates];
}
