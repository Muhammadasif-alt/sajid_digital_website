import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { whatsappLink } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, MapPin, Building2, CalendarClock, MessageCircle,
  ExternalLink, CheckCircle2, Briefcase,
} from "lucide-react";

export const dynamic = "force-dynamic";

function toList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
}

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await db.announcement.findUnique({ where: { slug } });
  if (!a || a.status === "draft") notFound();

  const details = toList(a.details);
  const waLink = whatsappLink(a.whatsapp, `Hello! I need information about the "${a.title}" announcement.`);
  const heroImage = imageUrl("announcement", a.id, a.featuredImage, a.updatedAt, 1200) ?? undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-navy-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={a.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <Link href="/announcements" className="inline-flex items-center text-white/70 hover:text-gold text-sm mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to announcements
              </Link>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {a.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-xs font-bold uppercase">★ Featured</Badge>}
                <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm">{a.sector}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{a.title}</h1>
              <p className="text-white/70 mt-2 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-gold" />{a.organization}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" />{a.location}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{a.description}</p>
            </section>
            {details.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Details &amp; Eligibility</h2>
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
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-navy/10 dark:bg-gold/10 flex items-center justify-center flex-shrink-0"><Briefcase className="h-4 w-4 text-navy dark:text-gold" /></div>
                  <div><p className="text-[11px] text-muted-foreground uppercase tracking-wide">Sector</p><p className="text-sm font-medium">{a.sector}</p></div>
                </div>
                {a.lastDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><CalendarClock className="h-4 w-4 text-red-500" /></div>
                    <div><p className="text-[11px] text-muted-foreground uppercase tracking-wide">Last Date</p><p className="text-sm font-medium text-red-500">{new Date(a.lastDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p></div>
                  </div>
                )}
              </div>

              {a.officialLink && (
                <a href={a.officialLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light dark:bg-gold dark:hover:bg-gold-light dark:text-navy-dark text-white font-semibold rounded-xl h-12 transition-colors">
                  <ExternalLink className="h-5 w-5" /> View Official Announcement
                </a>
              )}

              {waLink && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Need help?</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">Ask us anything about this job on WhatsApp.</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl h-12 transition-colors shadow-lg shadow-emerald-500/20">
                    <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
