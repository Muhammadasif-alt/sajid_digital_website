import Link from "next/link";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ArrowRight, CalendarDays, User } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Blog & Career Articles",
  description:
    "Career tips, job guides, study-abroad advice and digital skills articles from Sajad Digital Services, Lodhran.",
  path: "/blog",
  keywords: ["career blog Pakistan", "job tips Lodhran", "study abroad guide"],
});

export default async function BlogPage() {
  const blogs = await db.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/team4.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="h-3.5 w-3.5" /> Our Blog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Tips, Guides &amp; <span className="text-gradient-gold">Career Insights</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Helpful articles on jobs, CV writing, study abroad, freelancing and digital growth.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {blogs.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">No blog posts yet. Check back soon!</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {b.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl("blog", b.id, b.featuredImage, b.updatedAt, 700) ?? undefined} alt={b.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Newspaper className="h-10 w-10 text-gold/40" /></div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    {b.tags && (
                      <Badge variant="outline" className="self-start mb-3 text-[10px] font-semibold border-gold/40 text-gold uppercase tracking-wide">
                        {b.tags.split(",")[0].trim()}
                      </Badge>
                    )}
                    <h3 className="font-bold text-lg text-foreground leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                    {b.excerpt && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{b.excerpt}</p>}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {b.author}</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                      Read Article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
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