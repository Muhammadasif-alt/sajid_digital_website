"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, ArrowRight } from "lucide-react";
import { SERVICES, serviceWaLink as waLink } from "@/lib/services-data";

export function ServicesGridSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <LayoutGrid className="h-3 w-3 mr-1.5" /> Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            What We <span className="text-gradient-gold">Do For You</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete range of digital services to make your life easier and your future brighter.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.title}
                href={waLink(s.title)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group flex flex-col items-center text-center rounded-2xl bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 p-6 transition-all duration-300"
              >
                <div className="relative w-16 h-16 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-8 w-8 text-gold group-hover:text-navy-dark transition-colors" />
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-gold transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                  Get Started <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}