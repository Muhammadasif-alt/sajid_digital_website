"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  Rocket,
  ShieldCheck,
  Zap,
  Award,
  Headset,
  CheckCircle2,
} from "lucide-react";

const trust = [
  { icon: ShieldCheck, title: "Trusted & Secure", sub: "100% Reliable Services" },
  { icon: Zap, title: "Fast & Easy", sub: "Quick Support" },
  { icon: Award, title: "Expert Guidance", sub: "Professional Support" },
  { icon: Headset, title: "Your Success", sub: "Our #1 Goal" },
];

const highlights = ["Career Guidance", "Job Assistance", "Digital Growth", "Overseas Opportunities"];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function HeroCopy() {
  return (
    <div className="max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-5"
      >
        <Rocket className="h-4 w-4 text-gold" />
        <span className="text-sm font-semibold text-foreground">
          Empowering Careers, Enhancing Businesses
        </span>
      </motion.div>

      {/* Heading — golden */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.04] tracking-tight"
      >
        <span className="text-gold">Sajad Digital</span>
        <br />
        <span className="text-foreground">Services</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-4 text-lg sm:text-xl text-foreground/80 font-medium"
      >
        Your Trusted Partner for{" "}
        <span className="text-gold font-semibold">Career Growth, Digital Success</span>{" "}
        &amp; Overseas Opportunities.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-3 text-base text-muted-foreground"
      >
        We provide reliable digital solutions to help you build your career,
        grow your business and achieve your goals.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md"
      >
        {highlights.map((h) => (
          <div key={h} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-gold shrink-0" /> {h}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-7 flex flex-col sm:flex-row gap-3"
      >
        <Button
          onClick={() => scrollTo("#services")}
          size="lg"
          className="bg-gold-gradient text-navy-dark rounded-xl font-bold h-13 px-8 shadow-lg shadow-gold/25 w-full sm:w-auto"
        >
          Explore Services <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button
          onClick={() => scrollTo("#contact")}
          size="lg"
          variant="outline"
          className="border-foreground/20 text-foreground hover:bg-navy hover:text-white hover:border-navy rounded-xl font-bold h-13 px-8 w-full sm:w-auto"
        >
          <Phone className="h-4 w-4 mr-2" /> Contact Us
        </Button>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* MOBILE: stacked copy + full image */}
      <div className="lg:hidden">
        <div className="px-4 sm:px-6 pt-24 pb-8">
          <HeroCopy />
        </div>
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/white-hero-bg.webp" alt="Sajad Digital Services" className="w-full h-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blue-hero-bg.webp" alt="Sajad Digital Services" className="w-full h-auto hidden dark:block" />
        </div>
      </div>

      {/* DESKTOP: full cover image with copy overlaid on the left */}
      <div className="hidden lg:block pt-24">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/white-hero-bg.webp" alt="Sajad Digital Services" className="w-full h-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blue-hero-bg.webp" alt="Sajad Digital Services" className="w-full h-auto hidden dark:block" />
          {/* legibility veil on the left only */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent dark:from-navy-dark/85 dark:via-navy-dark/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <HeroCopy />
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-xl bg-navy px-4 py-3.5 shadow-lg"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                <t.icon className="h-5 w-5 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white leading-tight">{t.title}</div>
                <div className="text-xs text-white/60">{t.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}