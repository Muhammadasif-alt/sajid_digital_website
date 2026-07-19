"use client";

import { useEffect, useMemo, useState } from "react";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const PER_PAGE = 6; // 3 per row × 2 rows

export function SuccessStoriesGrid() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/success-stories?status=published&limit=500")
      .then((r) => r.json())
      .then((d) => setStories(d.stories || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(stories.length / PER_PAGE));
  const current = useMemo(
    () => stories.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [stories, page]
  );

  const goTo = (p: number) => {
    setPage(Math.min(totalPages, Math.max(1, p)));
    // Jump back up so the user sees the top of the new page.
    document.getElementById("stories-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-8 w-8 text-gold" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Success stories coming soon</h3>
        <p className="text-muted-foreground mt-2">We&apos;re adding our students&apos; journeys here — check back shortly.</p>
      </div>
    );
  }

  return (
    <div id="stories-grid" className="scroll-mt-28">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((s) => (
          <article
            key={s.id}
            className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300"
          >
            {s.image && (
              <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center">
                {/* object-contain so the whole photo is always visible */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </div>
            )}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-lg font-bold text-foreground leading-snug">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line flex-1">
                {s.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:border-gold hover:text-gold disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-sm font-semibold text-muted-foreground tabular-nums">
            Page <span className="text-foreground">{page}</span> of {totalPages}
          </span>

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:border-gold hover:text-gold disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
