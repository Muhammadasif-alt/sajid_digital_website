import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Images } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Sajad Digital Services",
  description: "Events, activities and moments from Sajad Digital Services — Lodhran.",
};

export default async function GalleryPage() {
  const items = await db.galleryItem.findMany({
    where: { status: "published" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Images className="h-3.5 w-3.5" /> Events &amp; Photos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Our <span className="text-gradient-gold">Gallery</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Moments from our events, MoU signings, trainings and community activities.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Images className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No photos yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((g) => (
                <div
                  key={g.id}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.image}
                      alt={g.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground">{g.title}</h3>
                    {g.caption && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{g.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
