"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, BadgeCheck, ExternalLink } from "lucide-react";

interface Mou {
  id: string;
  name: string;
  logo: string;
  description: string | null;
  website: string | null;
}

export function MouSection() {
  const [items, setItems] = useState<Mou[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners?type=MoU&status=published&limit=20")
      .then((r) => r.json())
      .then((d) => setItems(d.partners || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide the whole section until at least one MoU is added from the admin panel.
  if (!loading && items.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Handshake className="h-3.5 w-3.5 mr-1.5" /> Our Partnerships
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Official <span className="text-gradient-gold">MoUs &amp; Collaborations</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Our credibility is strengthened through Memorandums of Understanding with leading
            government institutions and educational organizations.
          </p>
        </motion.div>

        <div className="space-y-16">
          {loading
            ? Array.from({ length: 1 }).map((_, i) => (
                <div key={i} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="h-72 rounded-2xl bg-muted animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))
            : items.map((mou, i) => {
                const imageFirst = i % 2 === 0; // alternate sides
                return (
                  <motion.div
                    key={mou.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                  >
                    {/* Image side */}
                    <div className={`relative rounded-2xl overflow-hidden border border-border shadow-xl ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mou.logo} alt={mou.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>

                    {/* Text side */}
                    <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                      <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        <BadgeCheck className="h-3.5 w-3.5 mr-1" /> Official MoU
                      </Badge>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{mou.name}</h3>
                      {mou.description && (
                        <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
                          {mou.description}
                        </p>
                      )}
                      {mou.website && (
                        <Button asChild variant="outline" className="mt-5 border-gold/30 text-navy dark:text-gold hover:bg-gold/10 rounded-xl">
                          <a href={mou.website} target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
