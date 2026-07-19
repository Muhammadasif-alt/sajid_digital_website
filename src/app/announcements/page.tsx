import Link from "next/link";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Megaphone, MapPin, Building2, CalendarClock, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Job Announcements & Updates",
  description:
    "Latest government, semi-government and private job announcements across Pakistan — verified updates from Sajad Digital Services, Lodhran.",
  path: "/announcements",
  keywords: ["job announcements Pakistan", "government jobs Lodhran", "latest job updates"],
});

const sectorColors: Record<string, string> = {
  Government: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  Private: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  "Semi-Government": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
};

export default async function AnnouncementsPage() {
  const items = await db.announcement.findMany({
    where: { status: "published" },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/document.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/35 to-transparent" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <Megaphone className="h-3.5 w-3.5" /> Pakistan Jobs
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Job <span className="text-gradient-gold">Announcements</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl">
              Latest Government &amp; Private job openings across Pakistan. We keep you informed of every official announcement.
            </p>
            <p className="text-white/40 text-sm mt-4">{items.length} active announcement{items.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No announcements right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((a) => (
                <Link key={a.id} href={`/announcements/${a.slug}`} className="block h-full group">
                  <div className="h-full rounded-2xl border border-border/50 overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1 bg-card">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl("announcement", a.id, a.featuredImage, a.updatedAt, 700) ?? undefined} alt={a.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {a.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-[10px] font-bold uppercase">★ Featured</Badge>}
                        <Badge className={`text-[10px] font-medium border ${sectorColors[a.sector] || "bg-white/90 text-navy"}`}>{a.sector}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-navy dark:group-hover:text-gold transition-colors">{a.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">{a.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{a.organization}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        {a.lastDate ? (
                          <span className="text-xs text-red-500 flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" />Last: {new Date(a.lastDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        ) : <span className="text-xs text-muted-foreground">Open</span>}
                        <span className="text-navy dark:text-gold font-semibold text-sm flex items-center">Details<ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
