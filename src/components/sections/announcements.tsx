"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, MapPin, Building2, CalendarClock, ChevronRight, ArrowRight } from "lucide-react";

interface Announcement {
  id: string; title: string; slug: string; organization: string; sector: string;
  location: string; description: string; featuredImage: string; isFeatured: boolean; lastDate: string | null;
}

const sectorColors: Record<string, string> = {
  Government: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  Private: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  "Semi-Government": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
};

export function AnnouncementsSection() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/announcements?status=published&limit=4")
      .then((r) => r.json())
      .then((d) => setItems(d.announcements || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section id="announcements" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/30 text-gold">
            <Megaphone className="h-3 w-3 mr-1.5" /> Pakistan Jobs
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Latest Job <span className="text-gradient-gold">Announcements</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Government &amp; Private job openings across Pakistan — we keep you informed of every official announcement.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(loading ? Array.from({ length: 4 }) : items).map((a: Announcement | unknown, i) => {
            if (loading) return <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />;
            const item = a as Announcement;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}>
                <Link href={`/announcements/${item.slug}`} className="block h-full group">
                  <div className="h-full rounded-2xl border border-border/50 overflow-hidden bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-[10px] font-bold uppercase">★ Featured</Badge>}
                        <Badge className={`text-[10px] font-medium border ${sectorColors[item.sector] || "bg-white/90 text-navy"}`}>{item.sector}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-navy dark:group-hover:text-gold transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{item.organization}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{item.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        {item.lastDate ? (
                          <span className="text-xs text-red-500 flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" />Last: {new Date(item.lastDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        ) : <span className="text-xs text-muted-foreground">Open</span>}
                        <span className="text-navy dark:text-gold font-semibold text-sm flex items-center">Details<ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-navy/20 dark:border-gold/30 text-navy dark:text-gold hover:bg-navy/5 dark:hover:bg-gold/10 rounded-xl px-8 font-semibold">
            <Link href="/announcements">View All Announcements<ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
