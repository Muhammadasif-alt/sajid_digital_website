"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Info, ArrowRight } from "lucide-react";

const points = [
  "Career Support & Job Assistance",
  "Digital Marketing & Branding",
  "Overseas Education & Opportunities",
  "Scholarship & Admission Guidance",
  "Creative Design & Content Creation",
];

const WHATSAPP = "https://wa.me/923157033832";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Images/job-assistance.webp" alt="About Sajad Digital Services" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            {/* floating logo badge */}
            <div className="absolute -bottom-5 -right-3 bg-card rounded-2xl shadow-lg border border-border px-5 py-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SDS" className="h-12 w-auto object-contain" />
              <div>
                <div className="text-sm font-extrabold text-foreground leading-tight">Trusted Partner</div>
                <div className="text-xs text-muted-foreground">Since day one</div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
              <Info className="h-3 w-3 mr-1.5" /> About SDS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              About <span className="text-gradient-gold">Sajad Digital Services</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Sajad Digital Services (SDS) is a trusted platform dedicated to empowering
              individuals for career growth and digital success. We provide reliable job
              assistance, career counseling, overseas education guidance and digital
              marketing services to help you achieve your dreams.
            </p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-foreground font-medium">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-8 bg-navy hover:bg-navy-light text-white rounded-xl font-bold h-13 px-8 shadow-lg"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Learn More About Us <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}