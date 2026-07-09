"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Handshake, ChevronLeft, ChevronRight } from "lucide-react";

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
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/partners?status=published&limit=24")
      .then((r) => r.json())
      .then((d) => setPartners(d.partners || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide the section entirely until at least one partner is published.
  if (!loading && partners.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  // 3 cards per view on desktop, 2 on tablet, 1 on mobile (with gap-6 = 1.5rem).
  const itemWidth =
    "min-w-[80%] sm:min-w-[calc((100%-1.5rem)/2)] lg:min-w-[calc((100%-3rem)/3)] max-w-full snap-start";

  return (
    <section id="partners" className="py-18 lg:py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 text-center sm:text-left"
        >
          <div className="sm:max-w-xl">
            <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
              <Handshake className="h-3 w-3 mr-1.5" /> Our Partners &amp; MoU&apos;s
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Trusted <span className="text-gradient-gold">Institutions</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Proud to work alongside reputable partners and institutions.
            </p>
          </div>
          {partners.length > 3 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="w-11 h-11 rounded-full border border-border bg-background hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="w-11 h-11 rounded-full border border-border bg-background hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </motion.div>

        <div
          ref={scroller}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {(loading
            ? Array.from({ length: 3 }).map((_, i) => ({ id: String(i), name: "", logo: "", website: null, type: "" }))
            : partners
          ).map((p) => {
            const Tile = (
              <div className="group flex flex-col items-center justify-center gap-4 rounded-2xl bg-white border border-navy/10 hover:border-gold/50 shadow-sm hover:shadow-lg p-6 h-full transition-all">
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={p.name} className="w-full h-40 object-contain" />
                ) : (
                  <div className="w-full h-40 rounded bg-muted animate-pulse" />
                )}
                {p.name && (
                  <span className="text-base font-semibold text-navy/80 text-center leading-tight group-hover:text-gold transition-colors">
                    {p.name}
                  </span>
                )}
              </div>
            );
            return (
              <div key={p.id} className={itemWidth}>
                {p.website ? (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {Tile}
                  </a>
                ) : (
                  Tile
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
