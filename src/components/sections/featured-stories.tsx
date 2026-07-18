"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

/**
 * Admin-written success stories (title + description + image), ordered by the
 * admin and shown above Jobs on the home page. Separate from the review cards.
 * Hidden until at least one story is published.
 */
export function FeaturedStoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/success-stories?status=published&limit=12")
      .then((r) => r.json())
      .then((d) => setStories(d.stories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && stories.length === 0) return null;

  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-background">
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
            Real People, <span className="text-gradient-gold">Real Results</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Stories of students and clients whose careers changed with SDS.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            className={
              stories.length === 1
                ? "grid gap-6 max-w-2xl mx-auto"
                : stories.length === 2
                  ? "grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
                  : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {stories.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300"
              >
                {s.image && (
                  <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center">
                    {/* object-contain so the whole photo is visible — never crops the face */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1">
                    {s.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
