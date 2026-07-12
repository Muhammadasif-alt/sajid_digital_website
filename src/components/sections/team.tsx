"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string | null;
}

export function TeamSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team?status=published")
      .then((r) => r.json())
      .then((d) => setMembers(d.team || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide until at least one member is added from the admin panel.
  if (!loading && members.length === 0) return null;

  return (
    <section id="team" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <Users className="h-3 w-3 mr-1.5" /> Our Team
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            The People Behind <span className="text-gradient-gold">SDS</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            A dedicated team committed to your career growth and digital success.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
              ))
            : members.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                  className="rounded-2xl bg-card border border-border/50 overflow-hidden text-center hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all"
                >
                  <div className="h-56 w-full bg-muted flex items-center justify-center overflow-hidden">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-extrabold text-gold/50">{m.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground">{m.name}</h3>
                    <p className="text-sm text-gold font-semibold mt-0.5">{m.role}</p>
                    {m.bio && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.bio}</p>}
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
