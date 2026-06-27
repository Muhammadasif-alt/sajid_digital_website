import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { whatsappLink } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ServiceIcon } from "@/components/service-icon";
import { ArrowLeft, MessageCircle, CheckCircle2, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

const PHONES = ["0300-7033832", "0315-7033832"];

function toList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await db.service.findUnique({ where: { slug } });
  if (!s || s.status === "draft") notFound();

  const points = toList(s.details);
  const waLink = whatsappLink(s.whatsapp, `Hello! I'm interested in your "${s.title}" service. Please share the details.`);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="relative bg-navy-dark overflow-hidden">
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative">
            <Link href="/services" className="inline-flex items-center text-white/70 hover:text-gold text-sm mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to services
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <ServiceIcon name={s.icon} className="h-8 w-8 text-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {s.isFree && <Badge className="bg-emerald-500/15 text-emerald-400 border-0 text-[10px] font-bold uppercase">Free</Badge>}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{s.title}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{s.description}</p>
            </section>
            {points.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">What&apos;s included</h2>
                <ul className="space-y-2">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                <MessageCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold">Get this service</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Message us on WhatsApp and we&apos;ll get started right away.</p>
                {waLink && (
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl h-12 transition-colors shadow-lg shadow-emerald-500/20">
                    <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                  </a>
                )}
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground mb-3">Or call us</h3>
                <div className="space-y-2">
                  {PHONES.map((p) => (
                    <a key={p} href={`tel:+92${p.replace(/\D/g, "").replace(/^0/, "")}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy dark:hover:text-gold transition-colors">
                      <Phone className="h-4 w-4 text-gold" /> {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}