"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { ServiceIcon } from "@/components/service-icon";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  isFree: boolean;
}

export function ServicesPageGrid() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services?status=published&limit=100")
      .then((r) => r.json())
      .then((d) => setItems(d.services || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-gold" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Services coming soon</h3>
        <p className="text-muted-foreground mt-2">
          We&apos;re adding our services here. Please check back shortly.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-gold font-semibold hover:underline"
        >
          Contact us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((s) => (
        <Link
          key={s.id}
          href={`/services/${s.slug}`}
          className="group flex flex-col rounded-2xl bg-card border border-border hover:border-gold/50 shadow-sm hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 p-6 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-gold/12 border border-gold/25 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
            <ServiceIcon name={s.icon} className="h-8 w-8 text-gold group-hover:text-navy-dark transition-colors" />
          </div>
          <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-gold transition-colors">
            {s.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
            Learn More
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      ))}
    </div>
  );
}
