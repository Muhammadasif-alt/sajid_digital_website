import type { Metadata } from "next";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CtaBand } from "@/components/sections/cta-band";
import { GallerySection } from "@/components/sections/gallery-section";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/seo";
import { BadgeCheck, BookOpen, Target, Eye, Quote, Rocket } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "The journey of Sajad Digital Services — founded 03 October 2022 in Lodhran, now serving 20,000+ clients across Pakistan with jobs, career guidance, overseas support and digital services.",
  path: "/our-story",
  keywords: ["Sajad Digital Services story", "about SDS Lodhran", "SDS founder Sajad Rao"],
});

const journey = [
  { year: "2022", text: "Sajad Digital Services was established in Lodhran." },
  { year: "2023", text: "Expanded services and signed official MoUs with government and educational institutions." },
  { year: "2024", text: "Successfully served 15,000+ clients and strengthened our nationwide reputation." },
  { year: "2025–2026", text: "Expanded digital services across Pakistan while introducing new career support and business solutions." },
];

const stats = [
  "20,000+ Happy Clients served across Pakistan",
  "30,000+ Applications successfully processed",
  "5,000+ Students guided through career counseling for university admissions",
  "500+ Candidates successfully placed in government departments",
  "Official MoUs with government and educational institutions",
  "98% Client Satisfaction through quality services",
  "Expert Team providing professional guidance and support",
  "Fast, Transparent & Reliable service process",
  "Affordable & Personalized solutions for every client",
  "Dedicated Customer Support before and after every service",
];

export default async function OurStoryPage() {
  const founder =
    (await db.teamMember.findFirst({
      where: { status: "published", name: { contains: "Sajad" } },
    })) ??
    (await db.teamMember.findFirst({
      where: { status: "published" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }));

  const founderPhoto = founder ? imageUrl("team", founder.id, founder.photo, founder.updatedAt, 500) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/web-designers-at-work-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Our Story
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl">
              From a Small Dream to a <span className="text-gradient-gold">Trusted Digital Brand</span>
            </h1>
            <p className="text-white/60 mt-4 max-w-2xl text-lg">
              Your Trust, Our Services, Your Success — the journey of Sajad Digital Services, from
              Lodhran to thousands of clients across Pakistan.
            </p>
          </div>
        </div>

        {/* Founding intro — image one side, story the other */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/overseas.webp"
                  alt="Sajad Digital Services"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[520px] object-cover"
                />
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" /> How It Began
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Founded in Lodhran, <span className="text-gradient-gold">Built on Trust</span>
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Sajad Digital Services (SDS) was founded on{" "}
                  <span className="font-semibold text-foreground">03 October 2022</span> in Lodhran, Pakistan, with a
                  simple mission: to make digital services, career guidance and government application support
                  accessible, affordable and trustworthy for everyone.
                </p>
                <p>
                  What started as a small setup helping students and job seekers has grown into a trusted digital
                  platform serving thousands of clients across Pakistan. We believe every individual deserves honest
                  guidance, professional support and equal opportunities to succeed.
                </p>
                <p>
                  Over the years, SDS has assisted people with government job applications, educational admissions,
                  scholarships, professional CV writing, digital marketing, business promotion, website development
                  and many other digital solutions — earning the trust of students, professionals, businesses and
                  institutions alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey — timeline */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                <Rocket className="h-3.5 w-3.5 mr-1.5" /> Our Journey
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Milestones Along the <span className="text-gradient-gold">Way</span>
              </h2>
            </div>

            <div className="relative border-l-2 border-gold/30 ml-3 space-y-8">
              {journey.map((j) => (
                <div key={j.year} className="relative pl-8">
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gold border-4 border-background" />
                  <div className="text-gold font-extrabold text-lg">{j.year}</div>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{j.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground">Our Mission</h3>
              <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
                To provide reliable, transparent and affordable digital solutions that empower students,
                professionals, entrepreneurs and organizations through technology and expert guidance.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center mb-5">
                <Eye className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground">Our Vision</h3>
              <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
                To become Pakistan&apos;s most trusted digital services platform by delivering innovative
                solutions, maintaining the highest professional standards and creating opportunities for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Why People Choose SDS — stats */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                <BadgeCheck className="h-3.5 w-3.5 mr-1.5" /> Why People Choose SDS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Trusted, Transparent &amp; <span className="text-gradient-gold">Result-Driven</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Our commitment to quality, professionalism and client success has made us a trusted choice for
                students, job seekers, professionals and businesses across Pakistan.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center">
                    <BadgeCheck className="h-4 w-4 text-gold" />
                  </span>
                  <span className="text-foreground/90 font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's message */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-navy-dark to-navy overflow-hidden shadow-xl grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative bg-navy-dark min-h-[320px]">
                {founderPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={founderPhoto} alt="Sajad Rao — Founder & CEO" className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full min-h-[320px] flex items-center justify-center">
                    <span className="text-6xl font-extrabold text-gold/40">SR</span>
                  </div>
                )}
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="h-10 w-10 text-gold/40 mb-4" />
                <p className="text-white/90 text-lg lg:text-xl leading-relaxed italic">
                  &ldquo;Sajad Digital Services was built on one belief: every person deserves honest guidance and
                  equal opportunities. Our mission is not just to provide services, but to build trust, create
                  opportunities and help people achieve their goals. Thank you for being part of our journey.&rdquo;
                </p>
                <div className="mt-6">
                  <div className="text-gold font-extrabold text-lg">Sajad Rao</div>
                  <div className="text-white/60 text-sm">Founder &amp; CEO, Sajad Digital Services</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photos from the journey — admin-managed */}
        <GallerySection />

        <WhyChooseUsSection />
        <CtaBand
          title="Ready to take the next step?"
          subtitle="Thousands of people from Lodhran and across Pakistan already trust SDS. Let's see what we can do for you."
        />
      </main>
      <Footer />
    </div>
  );
}
