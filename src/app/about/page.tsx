import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about";
import { TeamSection } from "@/components/sections/team";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CounterSection } from "@/components/sections/counter";
import { CtaBand } from "@/components/sections/cta-band";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Sajad Digital Services (SDS), Lodhran — a trusted team empowering students and professionals with jobs, career guidance, overseas opportunities and complete digital services across Pakistan.",
  path: "/about",
  keywords: ["about Sajad Digital Services", "SDS Lodhran", "digital services company Lodhran"],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/Hero_About.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/35 to-transparent" />          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> About SDS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Empowering Careers, <span className="text-gradient-gold">Enhancing Businesses</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Your trusted partner for career growth, digital success &amp; overseas opportunities.
            </p>
          </div>
        </div>

        <AboutSection />
        <TeamSection />
        <CounterSection />
        <WhyChooseUsSection />
        <CtaBand
          title="Want to work with us?"
          subtitle="Talk to our team about your career, your studies or your business — we'll tell you honestly what we can do for you."
        />
      </main>
      <Footer />
    </div>
  );
}