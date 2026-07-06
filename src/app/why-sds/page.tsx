import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CounterSection } from "@/components/sections/counter";
import { ContactSection } from "@/components/sections/contact";
import { MouSection } from "@/components/sections/mou-section";
import { Sparkles, BadgeCheck } from "lucide-react";

export const metadata = {
  title: "Why SDS | Sajad Digital Services",
  description:
    "Why thousands trust Sajad Digital Services — official MoU with Rescue 1122 Lodhran, trusted by government & educational institutions, expert team and reliable services across Pakistan.",
};

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
              <Sparkles className="h-3.5 w-3.5" /> Why Choose SDS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Why Choose <span className="text-gradient-gold">Sajad Digital Services?</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Trusted, professional and client-focused digital solutions — strengthened by official
              collaborations and MoUs with leading institutions.
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

        {/* Official MoUs — admin-managed, image on one side + text on the other */}
        <MouSection />

        <WhyChooseUsSection />
        <CounterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
