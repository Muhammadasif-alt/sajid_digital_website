import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { CounterSection } from "@/components/sections/counter";
import { ContactSection } from "@/components/sections/contact";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Why SDS | Sajad Digital Services",
  description:
    "Why thousands trust Sajad Digital Services — expert team, 100% genuine services, personalized solutions, high success rate and affordable packages.",
};

export default function WhySdsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Why Choose SDS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Why People <span className="text-gradient-gold">Trust Us</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Trusted, professional and result-oriented services — that&apos;s the SDS promise.
            </p>
          </div>
        </div>

        <WhyChooseUsSection />
        <CounterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
