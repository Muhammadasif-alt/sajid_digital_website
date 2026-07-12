import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const SITE = "https://www.sajaddigitalservices.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/why-sds",
    "/success-stories",
    "/jobs",
    "/announcements",
    "/mous",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  // Dynamic detail pages — best effort; if the DB is unreachable we still
  // return the static routes so the sitemap never breaks the build.
  try {
    const [jobs, blogs, announcements] = await Promise.all([
      db.job.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } }),
      db.blog.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } }),
      db.announcement.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } }),
    ]);

    const dynamicRoutes: MetadataRoute.Sitemap = [
      ...jobs.map((j) => ({ url: `${SITE}/jobs/${j.slug}`, lastModified: j.updatedAt, priority: 0.7 })),
      ...blogs.map((b) => ({ url: `${SITE}/blog/${b.slug}`, lastModified: b.updatedAt, priority: 0.6 })),
      ...announcements.map((a) => ({ url: `${SITE}/announcements/${a.slug}`, lastModified: a.updatedAt, priority: 0.7 })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
  } catch {
    return staticRoutes;
  }
}