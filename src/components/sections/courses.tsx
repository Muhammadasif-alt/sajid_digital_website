"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, BarChart3, ChevronRight, ArrowRight } from "lucide-react";

interface Course {
  id: string; title: string; slug: string; category: string; description: string;
  featuredImage: string; isFeatured: boolean; duration: string | null; level: string;
  price: number | null; discountPrice: number | null; currency: string;
}

function priceLabel(price: number | null, discount: number | null, currency: string) {
  if (!price) return "Free";
  if (discount && discount < price) return `${currency} ${discount.toLocaleString()}`;
  return `${currency} ${price.toLocaleString()}`;
}

export function CoursesSection() {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses?status=published&limit=6")
      .then((r) => r.json())
      .then((d) => setItems(d.courses || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section id="courses" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/30 text-gold">
            <GraduationCap className="h-3 w-3 mr-1.5" /> Learn & Earn
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Professional <span className="text-gradient-gold">IT Courses</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Master in-demand skills — Web Development, Graphic Designing, Video Editing, SEO and more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? Array.from({ length: 3 }) : items).map((c: Course | unknown, i) => {
            if (loading) return <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />;
            const item = c as Course;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}>
                <Link href={`/courses/${item.slug}`} className="block h-full group">
                  <div className="h-full rounded-2xl border border-border/50 overflow-hidden bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all hover:-translate-y-1">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.isFeatured && <Badge className="bg-gold text-navy-dark border-0 text-[10px] font-bold uppercase">★ Featured</Badge>}
                        <Badge className="bg-white/90 text-navy text-[10px] font-medium border">{item.category}</Badge>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-navy-dark/80 text-gold border-gold/30 text-xs font-bold backdrop-blur-sm">{priceLabel(item.price, item.discountPrice, item.currency)}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-navy dark:group-hover:text-gold transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        {item.duration && <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{item.duration}</span>}
                        <span className="flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5" />{item.level}</span>
                      </div>
                      <div className="flex items-center justify-end pt-4 border-t border-border/50">
                        <span className="text-navy dark:text-gold font-semibold text-sm flex items-center">View Course<ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" /></span>
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
            <Link href="/courses">Explore All Courses<ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
