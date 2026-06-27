"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { JobCard, type JobWithCategory } from "@/components/job-card";

export function JobsCarouselSection() {
  const [jobs, setJobs] = useState<JobWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/jobs?status=published&limit=10")
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide entirely until jobs are published.
  if (!loading && jobs.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section id="jobs-latest" className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
              <Briefcase className="h-3 w-3 mr-1.5" /> Latest Jobs
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              New <span className="text-gradient-gold">Opportunities</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl">
              Freshly posted government &amp; private jobs — tap any to view full details and apply.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        </motion.div>

        {/* Carousel */}
        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[300px] sm:min-w-[340px] h-80 rounded-xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            ref={scroller}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {jobs.map((job, i) => (
              <div key={job.id} className="min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start">
                <JobCard job={job} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* View all */}
        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-foreground/20 text-foreground hover:bg-navy hover:text-white hover:border-navy rounded-xl px-8 font-bold"
          >
            <Link href="/jobs">
              View All Jobs <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}