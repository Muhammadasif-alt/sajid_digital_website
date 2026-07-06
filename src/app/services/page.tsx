import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";
import { ServicesPageGrid } from "@/components/sections/services-page-grid";

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blue-hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
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

        {/* Grid — admin-managed services from the database */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ServicesPageGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}