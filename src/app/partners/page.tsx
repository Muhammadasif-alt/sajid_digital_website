import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MouSection } from "@/components/sections/mou-section";
import { PartnersSection } from "@/components/sections/partners";
import { CtaBand } from "@/components/sections/cta-band";
import { Handshake, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Partners & MoUs",
  description:
    "Institutions that work with Sajad Digital Services — official MoUs with Rescue 1122 Lodhran, District Traffic Police Lodhran and other trusted partners.",
  path: "/partners",
  keywords: ["Sajad Digital Services partners", "MoU Rescue 1122 Lodhran", "government partnerships Lodhran"],
});

const highlights = [
  "Official MoU with Rescue 1122 Lodhran",
  "Official MoU with District Traffic Police Lodhran",
  "Trusted by government and educational institutions",
  "Subsidised services for partner departments",
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero with background image */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/team8.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/40" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Handshake className="h-3.5 w-3.5" /> Our Partners
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl">
              Working With <span className="text-gradient-gold">Trusted Institutions</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-2xl text-lg">
              Our credibility is strengthened through official agreements (MoUs) with leading
              government departments and educational organizations.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-2xl">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-white/85 text-sm">
                  <BadgeCheck className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MoUs — image one side, text the other */}
        <MouSection />

        {/* Partner logos */}
        <PartnersSection />

        <CtaBand
          title="Want to partner with SDS?"
          subtitle="We work with government departments, institutions and organisations. Reach out and let's discuss a collaboration."
        />
      </main>
      <Footer />
    </div>
  );
}
