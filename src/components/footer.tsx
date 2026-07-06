"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react";

const PHONE = "0315-7033832";
const EMAIL = "sajaddigitalservices@gmail.com";
const WHATSAPP = "https://wa.me/923157033832";
const WHATSAPP_GREETING =
  "Assalam-o-Alaikum!\n\nThanks for contacting Sajad Digital Services. 😊\n\nHow may we assist you today?";
const WHATSAPP_LINK = `${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why SDS", href: "/why-sds" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.79 4.79 0 0 1-3.24-1.48z" />
    </svg>
  );
}

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/share/18qNMa4FNx/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/sajaddigitalservices?igsh=bnMwcmVldnl4Y3Fy", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@sajaddigitalservices?_r=1&_t=ZS-97YKkrvZLgl", label: "TikTok" },
];

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // Services shown in the footer come from the admin (published services only).
  const [services, setServices] = useState<{ slug: string; title: string }[]>([]);
  useEffect(() => {
    fetch("/api/services?status=published&limit=6")
      .then((r) => r.json())
      .then((d) => setServices((d.services || []).map((s: { slug: string; title: string }) => ({ slug: s.slug, title: s.title }))))
      .catch(() => {});
  }, []);

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

          {/* Services (admin-managed) */}
          <div>
            <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-wide">Our Services</h4>
            <ul className="space-y-2.5">
              {services.length > 0 ? (
                services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-white/60 hover:text-gold transition-colors text-left line-clamp-1">
                      {s.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/services" className="text-sm text-white/60 hover:text-gold transition-colors">
                    All Services
                  </Link>
                </li>
              )}
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

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 transition-all hover:scale-105 animate-[pulse_2.5s_ease-in-out_infinite]"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.13 6.74 3.05 9.38L1.05 31.3l6.13-1.96A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.824 32 16S24.826 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.994-3.142 2.258-.836.178-1.928.32-5.602-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.842-.574 1.342-.574.162 0 .308.008.44.014.386.016.58.038.834.646.316.764 1.088 2.66 1.18 2.854.094.194.156.42.026.73-.122.31-.23.448-.424.69-.194.242-.378.428-.572.69-.178.226-.378.47-.162.84.216.362.96 1.582 2.062 2.562 1.42 1.264 2.598 1.656 2.968 1.81.27.112.59.086.806-.154.274-.31.612-.824.956-1.33.244-.362.552-.408.876-.286.33.116 2.094.988 2.454 1.168.36.18.598.268.686.418.086.15.086.866-.3 1.956z"/>
        </svg>
      </a>
    </footer>
  );
}