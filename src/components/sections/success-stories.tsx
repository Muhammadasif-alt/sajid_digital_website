"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Quote, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string | null;
  video: string | null;
}

/**
 * Client reviews on the home page. A horizontal slider that auto-advances,
 * pauses on hover, and can be nudged with the arrows. Shows up to 3 per view on
 * desktop. Renders nothing until the admin has added at least one review.
 */
export function SuccessStoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setStories((d.testimonials || []).slice(0, 12)))
      .catch(() => {});
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

  if (stories.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const itemWidth =
    "min-w-[85%] sm:min-w-[calc((100%-1.5rem)/2)] lg:min-w-[calc((100%-3rem)/3)] max-w-full snap-start";

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14 text-center sm:text-left"
        >
          <div className="sm:max-w-xl mx-auto sm:mx-0">
            <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
              <Trophy className="h-3 w-3 mr-1.5" /> Client Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What Our <span className="text-gradient-gold">Clients Say</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Real words from students and clients who built their careers with SDS.
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
          {stories.map((s) => (
            <article
              key={s.id}
              className={`${itemWidth} flex flex-col rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all`}
            >
              <Quote className="h-7 w-7 text-gold/40 mb-3" />
              <p className="text-foreground/90 leading-relaxed flex-1">{s.content}</p>

              <div className="flex gap-0.5 mt-4">
                {Array.from({ length: s.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              {s.video && (
                <a
                  href={s.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-gold/10 border border-gold/25 px-3.5 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-navy-dark transition-colors"
                >
                  <PlayCircle className="h-4 w-4" /> Watch video review
                </a>
              )}

              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
                {s.avatar ? (
                  // 1:1 crop — photos are uploaded square (800 × 800).
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.avatar}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 aspect-square rounded-xl object-cover border border-border flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 aspect-square rounded-xl bg-gold/15 flex items-center justify-center font-bold text-lg text-gold flex-shrink-0">
                    {s.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-bold text-foreground text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {/* Don't repeat the company when the title already names it. */}
                    {s.title}
                    {s.company && !s.title.toLowerCase().includes(s.company.toLowerCase())
                      ? ` · ${s.company}`
                      : ""}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
