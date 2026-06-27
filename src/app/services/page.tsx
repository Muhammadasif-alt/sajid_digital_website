import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { SERVICES, serviceWaLink } from "@/lib/services-data";

export const metadata = {
  title: "Our Services | Sajad Digital Services",
  description:
    "Job assistance, career counseling, CV writing, overseas education, digital marketing, graphic designing, freelancing and more — all in one place.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
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

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.title}
                  href={serviceWaLink(s.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center rounded-2xl bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 p-6 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-8 w-8 text-gold group-hover:text-navy-dark transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-gold transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                    <MessageCircle className="h-4 w-4" /> Get Started
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}