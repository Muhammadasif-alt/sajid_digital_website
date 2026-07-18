"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

/**
 * Home success-stories slider. Auto-advances on its own, pauses on hover, and
 * can be nudged with the arrows. Shows 3 per view on desktop. Hidden until the
 * admin publishes at least one story. Full list lives on /success-stories.
 */
export function FeaturedStoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    fetch("/api/success-stories?status=published&limit=24")
      .then((r) => r.json())
      .then((d) => setStories(d.stories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Auto-advance: step one "page" every 4s, loop back at the end.
  useEffect(() => {
    if (stories.length <= 3) return;
    const id = setInterval(() => {
      const el = scroller.current;
      if (!el || paused.current) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: el.clientWidth * 0.9, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(id);
  }, [stories.length]);

  if (!loading && stories.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const itemWidth =
    "min-w-[85%] sm:min-w-[calc((100%-1.5rem)/2)] lg:min-w-[calc((100%-3rem)/3)] max-w-full snap-start";

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-background">
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
              <Trophy className="h-3 w-3 mr-1.5" /> Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Real People, <span className="text-gradient-gold">Real Results</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Students and clients whose careers changed with SDS.
            </p>
          </div>
          {stories.length > 3 && (
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
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {(loading
            ? Array.from({ length: 3 }).map((_, i) => ({ id: String(i), title: "", description: "", image: null }))
            : stories
          ).map((s) => (
            <article
              key={s.id}
              className={`${itemWidth} flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300`}
            >
              {loading ? (
                <div className="h-72 bg-muted animate-pulse" />
              ) : (
                <>
                  {s.image && (
                    <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-5 flex-1">
                      {s.description}
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-1.5 text-gold font-semibold hover:underline"
          >
            View all success stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
