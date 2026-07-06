import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/sections/contact";
import { FaqSection } from "@/components/sections/faq";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us | Sajad Digital Services",
  description:
    "Get in touch with Sajad Digital Services for job assistance, career counseling, overseas opportunities and digital services. Call or WhatsApp 0315-7033832.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page hero with background image */}
        <div className="relative overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.webp"
            alt="Contact Sajad Digital Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* dark overlay for legible text */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/80 to-navy-dark/60" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <MessageSquare className="h-3.5 w-3.5" /> Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-2xl">
              Let&apos;s Start a{" "}
              <span className="text-gradient-gold">Conversation</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-2xl text-lg">
              Questions about jobs, services or overseas opportunities? Our team is
              here to help — reach out and we&apos;ll respond promptly.
            </p>
          </div>
        </div>

        {/* Contact form + info */}
        <ContactSection />

        {/* FAQs */}
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}