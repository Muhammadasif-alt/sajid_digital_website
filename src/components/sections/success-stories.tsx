"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Quote, PlayCircle } from "lucide-react";

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
 * Client success stories on the home page. Renders nothing until the admin has
 * added at least one, so the page never shows an empty section.
 */
export function SuccessStoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setStories((d.testimonials || []).slice(0, 6)))
      .catch(() => {});
  }, []);

  if (stories.length === 0) return null;

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Trophy className="h-3 w-3 mr-1.5" /> Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Students Who <span className="text-gradient-gold">Made It</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Real journeys of students and clients who built their careers with SDS.
          </p>
        </motion.div>

        {/* One or two stories shouldn't sit lonely in the left column — centre them. */}
        <div
          className={
            stories.length === 1
              ? "grid gap-6 max-w-xl mx-auto"
              : stories.length === 2
                ? "grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
                : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {stories.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex flex-col rounded-2xl bg-card border border-border p-6 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
