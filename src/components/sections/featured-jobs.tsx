"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { JobCard, type JobWithCategory } from "@/components/job-card";

export function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<JobWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs?status=published&limit=6");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch {
        // Error handling
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Hide the whole section when there are no published jobs yet.
  if (!loading && jobs.length === 0) return null;

  return (
    <section id="jobs" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/30 text-gold">
            <TrendingUp className="h-3 w-3 mr-1.5" />
            Featured Opportunities
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Latest Featured{" "}
            <span className="text-gradient-gold">Positions</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Handpicked premium roles from the world&apos;s most innovative companies. 
            Your next career breakthrough is waiting.
          </p>
        </motion.div>

        {/* Jobs grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-72 animate-pulse bg-muted/30">
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded-full w-16" />
                    <div className="h-6 bg-muted rounded-full w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-navy/20 dark:border-gold/30 text-navy dark:text-gold hover:bg-navy/5 dark:hover:bg-gold/10 rounded-xl px-8 font-semibold"
          >
            <Link href="/jobs">
              View All Open Positions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}