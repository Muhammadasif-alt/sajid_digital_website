"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Briefcase, ChevronRight } from "lucide-react";
import type { Job } from "@prisma/client";

export interface JobWithCategory extends Job {
  category: { id: string; name: string; slug: string; icon: string | null } | null;
}

const workModeColors: Record<string, string> = {
  Remote: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  Hybrid: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  "On-site": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
};

function formatSalary(min?: number | null, max?: number | null) {
  if (!min && !max) return null;
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  return fmt(min || max || 0);
}

export function JobCard({ job, index = 0 }: { job: JobWithCategory; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link href={`/jobs/${job.slug}`} className="block h-full">
        <Card className="group h-full border-border/50 hover:border-gold/40 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 overflow-hidden hover:-translate-y-1">
          {/* Banner image */}
          <div className="relative h-44 w-full overflow-hidden bg-navy">
            {job.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.featuredImage}
                alt={job.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-gold/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {job.isFeatured && (
                <Badge className="bg-gold text-navy-dark border-0 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  ★ Featured
                </Badge>
              )}
              <Badge className={`text-[10px] font-medium border ${workModeColors[job.workMode] || "bg-white/90 text-navy"}`}>
                {job.workMode}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] font-medium">{job.employmentType}</Badge>
              <span className="text-xs text-muted-foreground">{job.category?.name || job.department}</span>
            </div>

            <h3 className="font-bold text-lg text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors line-clamp-1">
              {job.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                {job.experience}
              </div>
              {formatSalary(job.salaryMin, job.salaryMax) && (
                <div className="flex items-center gap-1.5 text-foreground font-semibold">
                  <DollarSign className="h-3.5 w-3.5 text-gold" />
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                Posted {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <span className="text-navy dark:text-gold font-semibold text-sm flex items-center group/btn">
                Read More
                <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
