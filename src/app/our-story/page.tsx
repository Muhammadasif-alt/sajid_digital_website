import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CounterSection } from "@/components/sections/counter";
import { CtaBand } from "@/components/sections/cta-band";
import { GallerySection } from "@/components/sections/gallery-section";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "The journey behind Sajad Digital Services — from a small setup in Lodhran to a trusted name serving 15,000+ clients, with official MoUs with Rescue 1122 and District Traffic Police Lodhran.",
  path: "/our-story",
  keywords: ["Sajad Digital Services story", "about SDS Lodhran"],
});

const trustPoints = [
  "Official MoU with Rescue 1122 Lodhran",
  "Trusted by government and educational institutions",
  "Fast, transparent, and reliable services",
  "Experienced professional team",
  "Customer satisfaction and long-term support",
  "Serving clients across Pakistan",
];

export default function WhySdsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Our Story
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              The Journey Behind <span className="text-gradient-gold">Sajad Digital Services</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              From one small setup in Lodhran to a trusted name serving thousands — here is how it
              started, and why people keep choosing us.
            </p>
          </div>
        </div>

        {/* Intro + trust points */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-5">
              <p className="text-muted-foreground text-lg leading-relaxed">
                At <span className="font-semibold text-foreground">Sajad Digital Services (SDS)</span>, we are
                committed to providing trusted, professional, and client-focused digital solutions. Our
                credibility is strengthened through collaborations and Memorandums of Understanding (MoUs)
                with leading government institutions and educational organizations.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are proud to have an official MoU with{" "}
                <span className="font-semibold text-foreground">Rescue 1122 Lodhran</span>, reflecting our
                commitment to quality, trust, and community service. This partnership demonstrates that SDS
                works with reputable public institutions and maintains high professional standards.
              </p>
            </div>

            {/* Why Clients Trust SDS */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-5">Why Clients Trust SDS</h2>
              <ul className="space-y-4">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-gold" />
                    </span>
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/job-assistance.webp"
                  alt="The story of Sajad Digital Services"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                It Started With One <span className="text-gradient-gold">Simple Problem</span>
              </h2>

              <div className="mt-5 space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  In a city like Lodhran, talent was never the problem — <span className="font-semibold text-foreground">access</span> was.
                  Bright students were losing government jobs because nobody told them a form was
                  due. Graduates were sending out weak CVs. Families were paying agents for overseas
                  jobs that never existed.
                </p>
                <p>
                  Sajad Digital Services was started to fix exactly that: to put honest guidance,
                  professional documentation and real opportunities within reach of ordinary people —
                  at a price they could actually afford.
                </p>
                <p>
                  What began as a small setup helping a handful of students has grown into a trusted
                  name serving <span className="font-semibold text-foreground">15,000+ clients</span> across Pakistan and overseas.
                  Along the way we earned official MoUs with <span className="font-semibold text-foreground">Rescue 1122 Lodhran</span> and the{" "}
                  <span className="font-semibold text-foreground">District Traffic Police Lodhran</span> — because the institutions
                  that serve our community chose to work with us too.
                </p>
                <p className="text-foreground/90 font-medium">
                  Our promise has not changed since day one: no false hopes, no hidden charges — just
                  honest work that moves your career forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photos from the journey — admin-managed */}
        <GallerySection />

        <WhyChooseUsSection />
        <CounterSection />
        <CtaBand
          title="Ready to take the next step?"
          subtitle="Thousands of people from Lodhran and across Pakistan already trust SDS. Let's see what we can do for you."
        />
      </main>
      <Footer />
    </div>
  );
}
