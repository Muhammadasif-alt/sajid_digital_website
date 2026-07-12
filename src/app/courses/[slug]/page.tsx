import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { whatsappLink } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Clock, BarChart3, MessageCircle, CheckCircle2, GraduationCap, Tag,
} from "lucide-react";

export const dynamic = "force-dynamic";

function toList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await db.course.findUnique({ where: { slug } });
  if (!c || c.status === "draft") notFound();

  const details = toList(c.details);
  const waLink = whatsappLink(c.whatsapp, `Hello! I'm interested in enrolling in the "${c.title}" course. Please share the details.`);
  const hasDiscount = c.discountPrice && c.price && c.discountPrice < c.price;
  const heroImage = imageUrl("course", c.id, c.featuredImage, c.updatedAt, 1200) ?? undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-navy-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={c.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <Link href="/courses" className="inline-flex items-center text-white/70 hover:text-gold text-sm mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to courses
              </Link>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {c.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-xs font-bold uppercase">★ Featured</Badge>}
                <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm">{c.category}</Badge>
                <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm">{c.level}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{c.title}</h1>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-3">About this course</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{c.description}</p>
            </section>
            {details.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">What you&apos;ll learn</h2>
                <ul className="space-y-2">
                  {details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /><span>{d}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="text-center mb-4">
                  {c.price ? (
                    <div>
                      {hasDiscount && <span className="text-muted-foreground line-through text-lg mr-2">{c.currency} {c.price?.toLocaleString()}</span>}
                      <span className="text-3xl font-bold text-navy dark:text-gold">{c.currency} {(hasDiscount ? c.discountPrice : c.price)?.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-emerald-500">Free</span>
                  )}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3"><GraduationCap className="h-4 w-4 text-gold" /> <span className="text-muted-foreground">Category:</span> <span className="font-medium ml-auto">{c.category}</span></div>
                  <div className="flex items-center gap-3"><BarChart3 className="h-4 w-4 text-gold" /> <span className="text-muted-foreground">Level:</span> <span className="font-medium ml-auto">{c.level}</span></div>
                  {c.duration && <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-gold" /> <span className="text-muted-foreground">Duration:</span> <span className="font-medium ml-auto">{c.duration}</span></div>}
                  {hasDiscount && <div className="flex items-center gap-3"><Tag className="h-4 w-4 text-emerald-500" /> <span className="text-emerald-500 font-medium ml-auto">Limited-time offer</span></div>}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                <MessageCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold">Ready to enroll?</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Message us on WhatsApp to reserve your seat.</p>
                {waLink ? (
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl h-12 transition-colors shadow-lg shadow-emerald-500/20">
                    <MessageCircle className="h-5 w-5" /> Enroll on WhatsApp
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Contact details coming soon.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
