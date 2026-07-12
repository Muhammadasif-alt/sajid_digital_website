import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CounterSection } from "@/components/sections/counter";
import { CtaBand } from "@/components/sections/cta-band";
import { Trophy, Star, Quote } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Success Stories | Sajad Digital Services",
  description:
    "Real success stories from students and clients who built their careers with Sajad Digital Services.",
};

export default async function SuccessStoriesPage() {
  const stories = await db.testimonial.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
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
              <Trophy className="h-3.5 w-3.5" /> Success Stories
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Students Who <span className="text-gradient-gold">Made It</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Real journeys of students and clients who built their careers with SDS.
            </p>
          </div>
        </div>

        {/* Stories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {stories.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Success stories coming soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all"
                >
                  <Quote className="h-7 w-7 text-gold/40 mb-3" />
                  <p className="text-foreground/90 leading-relaxed">{s.content}</p>
                  <div className="flex gap-0.5 mt-4">
                    {Array.from({ length: s.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
                    <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center font-bold text-gold flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-foreground text-sm truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {s.title}
                        {s.company ? ` · ${s.company}` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <CounterSection />
        <CtaBand
          title="Your story could be next."
          subtitle="Every success here started with one simple message. Tell us your goal and we'll help you get there."
        />
      </main>
      <Footer />
    </div>
  );
}
