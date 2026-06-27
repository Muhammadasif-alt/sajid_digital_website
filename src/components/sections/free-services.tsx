"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/service-icon";

interface Service {
  id: string; title: string; slug: string; description: string;
  icon: string | null; isFree: boolean;
}

export function FreeServicesSection() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services?status=published&limit=8")
      .then((r) => r.json())
      .then((d) => setItems(d.services || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/30 text-gold">
            <Sparkles className="h-3 w-3 mr-1.5" /> What We Offer
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to grow your career and business online — handled by one trusted partner.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(loading ? Array.from({ length: 8 }) : items).map((s: Service | unknown, i) => {
            if (loading) return <div key={i} className="h-44 rounded-2xl bg-muted animate-pulse" />;
            const item = s as Service;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}>
                <Link href={`/services/${item.slug}`} className="block h-full group">
                  <div className="h-full rounded-2xl border border-border/50 bg-card p-6 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 dark:bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-navy/10 dark:group-hover:bg-gold/20 transition-colors">
                      <ServiceIcon name={item.icon} className="h-6 w-6 text-navy dark:text-gold" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                    <span className="text-navy dark:text-gold font-semibold text-sm flex items-center mt-3">
                      Learn More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-navy hover:bg-navy-light dark:bg-gold dark:hover:bg-gold-light dark:text-navy-dark text-white rounded-xl px-8 font-semibold">
            <Link href="/services">View All Services<ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}