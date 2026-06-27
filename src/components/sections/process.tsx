"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  LayoutGrid,
  Settings2,
  Trophy,
  ArrowRight,
  Workflow,
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/923007033832";

const steps = [
  {
    icon: MessageCircle,
    title: "Contact Us",
    description:
      "Message us on WhatsApp and simply tell us what you need — a job, a CV, a course, an online application or any service.",
    cta: { label: "Chat on WhatsApp", href: WHATSAPP_LINK, external: true },
  },
  {
    icon: LayoutGrid,
    title: "Choose Your Service",
    description:
      "Pick from jobs, job announcements, IT courses, CV writing, digital marketing and our other professional services.",
    cta: { label: "View Services", href: "/services", external: false },
  },
  {
    icon: Settings2,
    title: "We Get to Work",
    description:
      "Our team handles your request professionally, on time, and keeps you updated at every single step of the way.",
    cta: { label: "Why Choose Us", href: "#about", external: false },
  },
  {
    icon: Trophy,
    title: "Achieve Your Goal",
    description:
      "Get your job, your completed CV, course access or marketing results — and grow your career and business with confidence.",
    cta: { label: "Get Started", href: WHATSAPP_LINK, external: true },
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/30 text-gold">
            <Workflow className="h-3 w-3 mr-1.5" /> How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our Simple{" "}
            <span className="text-gradient-gold">Step-by-Step Process</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            From your first message to the final result, we guide you through every step — clear, simple and fully supported.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* STEP badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block bg-navy dark:bg-gold text-white dark:text-navy-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-lg">
                    Step {i + 1}
                  </span>
                </div>

                <div className="h-full pt-6 rounded-2xl border border-border/50 bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 group">
                  {/* Visual header */}
                  <div className="mx-4 mt-2 mb-5 h-36 rounded-xl bg-gradient-to-br from-navy via-navy to-navy-light flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gold/10 blur-2xl" />
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-gold" />
                    </div>
                    <span className="absolute top-3 right-3 text-5xl font-black text-white/5 select-none">{i + 1}</span>
                  </div>

                  {/* Text */}
                  <div className="px-5 pb-6 text-center">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {step.description}
                    </p>
                    {step.cta.external ? (
                      <a
                        href={step.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center mt-4 text-sm font-semibold text-navy dark:text-gold uppercase tracking-wide border-b-2 border-gold/40 hover:border-gold pb-0.5 transition-colors"
                      >
                        {step.cta.label} <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </a>
                    ) : (
                      <Link
                        href={step.cta.href}
                        className="inline-flex items-center justify-center mt-4 text-sm font-semibold text-navy dark:text-gold uppercase tracking-wide border-b-2 border-gold/40 hover:border-gold pb-0.5 transition-colors"
                      >
                        {step.cta.label} <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="bg-navy hover:bg-navy-light dark:bg-gold dark:hover:bg-gold-light dark:text-navy-dark text-white rounded-xl px-10 h-13 font-semibold shadow-lg">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Get Started Free <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}