"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Images } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  caption: string | null;
}

/**
 * Gallery photos rendered inside the Our Story page. Renders nothing until the
 * admin has published at least one photo, so the page never shows an empty box.
 */
export function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/api/gallery?status=published&limit=24")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Images className="h-3.5 w-3.5 mr-1.5" /> Events &amp; Photos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Moments From <span className="text-gradient-gold">Our Journey</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-2xl mx-auto">
            Trainings, MoU signings, community activities and the people behind them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((g) => (
            <div
              key={g.id}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all"
            >
              <div className="relative h-60 w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{g.title}</h3>
                {g.caption && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{g.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
