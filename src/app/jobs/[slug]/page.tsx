import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { whatsappLink } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  DollarSign,
  Building2,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";

function toList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function formatSalary(min: number | null, max: number | null, currency: string) {
  const sym = currency === "USD" ? "$" : currency + " ";
  const fmt = (n: number) => `${sym}${n.toLocaleString()}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return null;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await db.job.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!job || job.status === "draft") {
    notFound();
  }

  const responsibilities = toList(job.responsibilities);
  const requirements = toList(job.requirements);
  const benefits = toList(job.benefits);
  const salary = formatSalary(job.salaryMin, job.salaryMax, job.currency);
  const waLink = whatsappLink(
    job.whatsapp,
    `Hello! I'm interested in applying for the "${job.title}" position. Please share the details.`
  );

  const metaItems = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Briefcase, label: "Experience", value: job.experience },
    { icon: Building2, label: "Work Mode", value: job.workMode },
    { icon: Clock, label: "Type", value: job.employmentType },
    { icon: GraduationCap, label: "Education", value: job.education },
    { icon: Building2, label: "Department", value: job.category?.name || job.department },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Banner hero */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-navy-dark">
          {job.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.featuredImage} alt={job.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy-dark/30" />

          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <Link
                href="/jobs"
                className="inline-flex items-center text-white/70 hover:text-gold text-sm mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to all jobs
              </Link>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {job.isFeatured && (
                  <Badge className="bg-gold text-navy-dark border-0 text-xs font-bold uppercase tracking-wider">★ Featured</Badge>
                )}
                <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm">{job.workMode}</Badge>
                <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm">{job.employmentType}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {job.title}
              </h1>
              <p className="text-white/70 mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gold" /> {job.location}
                {salary && (
                  <>
                    <span className="text-white/30">•</span>
                    <DollarSign className="h-4 w-4 text-gold" /> {salary}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </section>

            {responsibilities.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Responsibilities</h2>
                <ul className="space-y-2">
                  {responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {requirements.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {benefits.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">Benefits</h2>
                <ul className="space-y-2">
                  {benefits.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Job Overview</h3>
                <div className="space-y-4">
                  {metaItems.map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy/10 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <m.icon className="h-4 w-4 text-navy dark:text-gold" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{m.label}</p>
                        <p className="text-sm font-medium text-foreground">{m.value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy/10 dark:bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 text-navy dark:text-gold" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Posted</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(job.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply via WhatsApp */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                <MessageCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Ready to apply?</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Apply directly on WhatsApp — quick and easy.
                </p>
                {waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl h-12 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Apply on WhatsApp
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
