"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  ArrowUp,
} from "lucide-react";

const PHONE = "0315-7033832";
const EMAIL = "sajaddigitalservices@gmail.com";
const WHATSAPP = "https://wa.me/923157033832";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why SDS", href: "#why-choose" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Job Assistance",
  "Career Counseling",
  "Overseas Guidance",
  "Digital Marketing",
  "CV Writing",
  "Graphic Designing",
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const go = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        if (pathname === "/") {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/" + href);
        }
      } else {
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <footer className="bg-navy-dark text-white relative">
      <div className="h-1 bg-gradient-to-r from-navy via-gold to-navy" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Sajad Digital Services" className="h-20 w-auto object-contain mb-4" />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-5">
              Empowering careers, enhancing businesses and creating opportunities for everyone
              across Pakistan & overseas.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gold border border-white/10 flex items-center justify-center transition-all group"
                >
                  <s.icon className="h-4 w-4 text-white/70 group-hover:text-navy-dark transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={() => go(l.href)} className="text-sm text-white/60 hover:text-gold transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wide">Our Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <button onClick={() => go("#services")} className="text-sm text-white/60 hover:text-gold transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + hours */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wide">Contact Info</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone className="h-4 w-4 text-gold shrink-0" /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-gold transition-colors break-all">
                  <Mail className="h-4 w-4 text-gold shrink-0" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0" /> Lahore, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold shrink-0" /> Mon - Sat: 9AM - 7PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/45">
          <p>&copy; {new Date().getFullYear()} Sajad Digital Services. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for your success
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gold hover:bg-gold-dark text-navy-dark flex items-center justify-center shadow-lg shadow-gold/30 transition-all"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}