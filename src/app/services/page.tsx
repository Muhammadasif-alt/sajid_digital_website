import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BadgeCheck, MessageCircle, ArrowRight } from "lucide-react";
import { ServicesPageGrid } from "@/components/sections/services-page-grid";

export const metadata = {
  title: "Our Services | Sajad Digital Services",
  description:
    "Job assistance, career counseling, CV writing, overseas education, digital marketing, graphic designing, freelancing and more — all in one place.",
};

const WHATSAPP =
  "https://wa.me/923157033832?text=" +
  encodeURIComponent("Assalam-o-Alaikum! I would like to know more about your services.");

const promises = [
  "One team for every service — no running between agencies",
  "A plan built around your goal, not a fixed package",
  "Clear, honest pricing agreed before we start",
  "Support that continues after the work is delivered",
];

const steps = [
  { n: "1", title: "Message us on WhatsApp", desc: "Tell us what you need — a job, a CV, a website or guidance for going abroad." },
  { n: "2", title: "We understand your goal", desc: "A short conversation so we know your background, budget and timeline." },
  { n: "3", title: "You get a clear plan", desc: "Exact steps, what it costs and how long it takes — no hidden charges." },
  { n: "4", title: "We deliver & stay with you", desc: "Work is completed on time, and our team stays available for follow-up support." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> What We Offer
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Everything you need to grow your career and business — handled by one trusted partner.
            </p>
          </div>
        </div>

        {/* Section 1 — image one side, explanation the other */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/services-home.webp"
                  alt="The Sajad Digital Services team at work"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                One Roof, Every Service
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                From Your First CV to Your{" "}
                <span className="text-gradient-gold">First Job Abroad</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Most people lose time and money running between different agencies — one for the CV,
                one for the job application, another for the visa file. At Sajad Digital Services,
                a single experienced team handles all of it for you.
              </p>
              <p className="mt-3 text-muted-foreground text-lg leading-relaxed">
                Whether you are a fresh graduate looking for your first job, a professional aiming
                to go overseas, or a business that needs a digital presence — we build the plan
                around <span className="font-semibold text-foreground">your</span> goal.
              </p>

              <ul className="mt-6 space-y-3">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-gold" />
                    </span>
                    <span className="text-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Grid — admin-managed services from the database */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ServicesPageGrid />
        </div>

        {/* Section 2 — below the services: how to get started */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="lg:order-2 relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/apply.webp"
                  alt="Getting started with Sajad Digital Services"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:order-1">
              <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
                Getting Started
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Four Simple <span className="text-gradient-gold">Steps</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                No long forms, no office visits needed. Everything starts with one message.
              </p>

              <div className="mt-7 space-y-5">
                {steps.map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/15 text-gold font-extrabold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-bold text-foreground">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="mt-8 bg-gold-gradient text-navy-dark rounded-xl px-7 font-bold shadow-md shadow-gold/20">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" /> Start on WhatsApp
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
