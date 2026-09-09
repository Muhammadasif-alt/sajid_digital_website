"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Briefcase, HeartHandshake, Award } from "lucide-react";

const stats = [
  { icon: Users,          value: "30,000+", label: "Students Reached" },
  { icon: Briefcase,      value: "1,000+",  label: "Students Got Jobs" },
  { icon: HeartHandshake, value: "15,000+", label: "Happy Clients" },
  { icon: Award,          value: "5+",      label: "Years of Experience" },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function HeroCopy() {
  return (
    <div className="max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 border border-gold/40 mb-5 backdrop-blur-sm"
      >
        <Rocket className="h-4 w-4 text-gold" />
        <span className="text-sm font-semibold text-white uppercase tracking-wider">
          Your Digital Growth Partner
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.06] tracking-tight"
      >
        <span className="text-white">One Window.</span>
        <br />
        <span className="text-gold">Endless Possibilities.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed"
      >
        From high converting websites and eCommerce platforms to SEO and custom digital solutions,
        Sajad Digital Services delivers reliable technology designed around your business goals.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        className="mt-8 flex flex-col sm:flex-row gap-3"
      >
        <Button
          onClick={() => scrollTo("#services")}
          size="lg"
          className="bg-gold-gradient text-navy-dark rounded-xl font-bold h-13 px-8 shadow-lg shadow-gold/25 w-full sm:w-auto"
        >
          Explore Services <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        <Button
          onClick={() => scrollTo("#about")}
          size="lg"
          variant="outline"
          className="border-white/30 text-white bg-white/5 hover:bg-white hover:text-navy-dark hover:border-white rounded-xl font-bold h-13 px-8 w-full sm:w-auto backdrop-blur-sm"
        >
          About SDS <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}

// Branded SAJAD Digital hero banner — logo sits on the right, copy overlays the left.
const HERO_IMAGE = "/Images/Hero-sajjad-digital.webp";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* MOBILE: full screen image with copy overlaid */}
      <div className="lg:hidden relative min-h-screen flex items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="Sajad Digital Services" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/92 via-navy-dark/50 to-navy-dark/20" />
        <div className="relative px-4 sm:px-6 pt-28 pb-12 w-full">
          <HeroCopy />
        </div>
      </div>

      {/* DESKTOP: full viewport height image with copy overlaid on the left */}
      <div className="hidden lg:block">
        <div className="relative min-h-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMAGE} alt="Sajad Digital Services" className="absolute inset-0 w-full h-full object-cover object-center" />
          {/* light veil only on the left where the copy sits — image stays clear on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/40 to-transparent" />
          <div className="absolute top-24 bottom-0 left-0 right-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <HeroCopy />
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-navy-dark dark:bg-navy-dark light:bg-slate-900 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-3 py-5 px-4">
                <s.icon className="h-7 w-7 text-gold shrink-0" />
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-gold leading-none">{s.value}</div>
                  <div className="mt-0.5 text-xs sm:text-sm font-medium text-white/65 leading-tight">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}