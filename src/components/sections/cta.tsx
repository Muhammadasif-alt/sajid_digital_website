"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-navy/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-light p-10 lg:p-16 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/5 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gold/5 blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/80">
                Start your journey today
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Take the{" "}
              <span className="text-gradient-gold">Next Step?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Looking for a job, want to learn a new skill, or need help with your CV or applications?
              Message us on WhatsApp and we&apos;ll guide you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-navy-dark font-bold px-10 h-14 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all text-base"
              >
                <Link href="/jobs">
                  Browse Jobs
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-xl font-semibold text-base"
              >
                <a href="https://wa.me/923007033832" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}