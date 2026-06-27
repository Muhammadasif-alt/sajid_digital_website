"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Handshake } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: string;
  logo: string;
  website: string | null;
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners?status=published&limit=24")
      .then((r) => r.json())
      .then((d) => setPartners(d.partners || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide the section entirely until at least one partner is published.
  if (!loading && partners.length === 0) return null;

  return (
    <section id="partners" className="py-18 lg:py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Handshake className="h-3 w-3 mr-1.5" /> Our Partners &amp; MoU&apos;s
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Trusted <span className="text-gradient-gold">Institutions</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Proud to work alongside reputable partners and institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {(loading ? Array.from({ length: 6 }).map((_, i) => ({ id: String(i), name: "", logo: "", website: null, type: "" })) : partners).map((p, i) => {
            const Tile = (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-white border border-navy/10 hover:border-gold/50 shadow-sm hover:shadow-md p-5 h-32 transition-all"
              >
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={p.name} className="max-h-14 w-auto object-contain" />
                ) : (
                  <div className="h-12 w-24 rounded bg-muted animate-pulse" />
                )}
                {p.name && (
                  <span className="text-xs font-semibold text-navy/70 text-center leading-tight group-hover:text-gold transition-colors">
                    {p.name}
                  </span>
                )}
              </motion.div>
            );
            return p.website ? (
              <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer">{Tile}</a>
            ) : (
              <div key={p.id}>{Tile}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}