import Link from "next/link";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, BarChart3, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "IT Courses",
  description:
    "Practical IT courses — SEO, web development, graphic and video design, freelancing and more — at Sajad Digital Services, Lodhran.",
  path: "/courses",
  keywords: ["IT courses Lodhran", "web development course Pakistan", "freelancing course Lodhran", "SEO course"],
});

function priceLabel(price: number | null, discount: number | null, currency: string) {
  if (!price) return "Free";
  if (discount && discount < price) return `${currency} ${discount.toLocaleString()}`;
  return `${currency} ${price.toLocaleString()}`;
}

export default async function CoursesPage() {
  const courses = await db.course.findMany({
    where: { status: "published" },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative bg-navy-dark overflow-hidden">
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="h-3.5 w-3.5" /> Learn & Earn
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              IT <span className="text-gradient-gold">Courses</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl">
              Master in-demand skills — Web Development, Graphic Designing, Video Editing, SEO and more. Enroll directly on WhatsApp.
            </p>
            <p className="text-white/40 text-sm mt-4">{courses.length} course{courses.length === 1 ? "" : "s"} available</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {courses.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No courses available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <Link key={c.id} href={`/courses/${c.slug}`} className="block h-full group">
                  <div className="h-full rounded-2xl border border-border/50 overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1 bg-card">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl("course", c.id, c.featuredImage, c.updatedAt, 700) ?? undefined} alt={c.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {c.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-[10px] font-bold uppercase">★ Featured</Badge>}
                        <Badge className="bg-white/90 text-navy text-[10px] font-medium border">{c.category}</Badge>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-navy-dark/80 text-gold border-gold/30 text-xs font-bold backdrop-blur-sm">{priceLabel(c.price, c.discountPrice, c.currency)}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-navy dark:group-hover:text-gold transition-colors">{c.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">{c.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        {c.duration && <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{c.duration}</span>}
                        <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" />{c.level}</span>
                      </div>
                      <div className="flex items-center justify-end pt-4 border-t border-border/50">
                        <span className="text-navy dark:text-gold font-semibold text-sm flex items-center">View Course<ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
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
