import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JobCard, type JobWithCategory } from "@/components/job-card";
import { Briefcase } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Latest Jobs & Career Updates",
  description:
    "Browse the latest local and overseas job openings and apply on WhatsApp. Government and private job updates from Sajad Digital Services, Lodhran.",
  path: "/jobs",
  keywords: ["latest jobs Lodhran", "jobs in Pakistan", "overseas jobs", "apply job WhatsApp"],
});

export default async function JobsPage() {
  const rows = await db.job.findMany({
    where: { status: "published" },
    include: { category: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  // JobCard is a client component — swap the base64 blob for a /api/img URL so it
  // never gets serialized into the RSC payload.
  const jobs = rows.map((job) => ({
    ...job,
    featuredImage: imageUrl("job", job.id, job.featuredImage, job.updatedAt, 700),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <Briefcase className="h-3.5 w-3.5" /> Careers
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Open <span className="text-gradient-gold">Positions</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl">
              Explore our current openings. Found a role that fits? Apply directly on WhatsApp in seconds.
            </p>
            <p className="text-white/40 text-sm mt-4">{jobs.length} open position{jobs.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {jobs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No open positions right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job as JobWithCategory} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
