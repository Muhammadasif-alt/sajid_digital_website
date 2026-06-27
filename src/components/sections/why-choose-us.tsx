"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  LifeBuoy,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";

const reasons = [
  { icon: Users, title: "Expert Team & Professional Guidance", desc: "Experienced professionals dedicated to your career and business growth." },
  { icon: ShieldCheck, title: "100% Genuine & Trusted Services", desc: "Honest, reliable and transparent services you can count on every time." },
  { icon: UserCheck, title: "Personalized Solutions", desc: "Tailored solutions designed around your unique goals and needs." },
  { icon: TrendingUp, title: "High Success Rate", desc: "Proven results with high client satisfaction across Pakistan." },
  { icon: BadgeDollarSign, title: "Affordable Packages", desc: "Premium quality services at the most affordable and fair prices." },
  { icon: LifeBuoy, title: "Comprehensive Support", desc: "Everything you need in one place with full end-to-end support." },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose" className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Sparkles className="h-3 w-3 mr-1.5" /> Why Choose SDS
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Why People <span className="text-gradient-gold">Trust Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            We are committed to delivering trusted, professional and result-oriented services.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-gold/40 p-6 shadow-sm transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <r.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}