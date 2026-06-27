"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ServiceIcon } from "@/components/service-icon";
import { CheckCircle2, ArrowRight, Layers, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/923007033832";

type FlipService = {
  num: string;
  title: string;
  slug: string;
  icon: string;
  tag: string;
  focus: string;
  meta: string;
  features: string[];
};

const SERVICES: FlipService[] = [
  {
    num: "/ 01", title: "Career Counseling", slug: "career-counseling", icon: "Compass",
    tag: "GUIDANCE", focus: "Career & Future Planning", meta: "1-ON-1 SESSION",
    features: ["Personalised career guidance", "Field & path selection", "Strengths assessment", "Goal-setting roadmap"],
  },
  {
    num: "/ 02", title: "CV / Resume Writing", slug: "cv-resume-writing", icon: "FileText",
    tag: "WRITING", focus: "ATS-Friendly Resumes", meta: "UNLIMITED EDITS",
    features: ["Professional CV writing", "ATS-friendly format", "Cover letter included", "LinkedIn optimization"],
  },
  {
    num: "/ 03", title: "Job Assistance", slug: "job-assistance", icon: "Briefcase",
    tag: "PLACEMENT", focus: "Find & Secure Jobs", meta: "END-TO-END",
    features: ["Job search in your field", "Shortlisting vacancies", "Application submission", "Interview preparation"],
  },
  {
    num: "/ 04", title: "Online Applications", slug: "online-applications", icon: "Send",
    tag: "APPLY", focus: "Govt & Private Forms", meta: "ON-TIME",
    features: ["Govt & private applications", "Online form filling", "Document uploading", "Before-deadline submission"],
  },
  {
    num: "/ 05", title: "Business Consultancy", slug: "business-consultancy", icon: "TrendingUp",
    tag: "STRATEGY", focus: "Start & Grow Business", meta: "ADVISORY",
    features: ["Business idea & planning", "Online presence setup", "Branding guidance", "Growth strategy"],
  },
  {
    num: "/ 06", title: "Social Media Management", slug: "social-media-management", icon: "Share2",
    tag: "SOCIAL", focus: "Grow Your Pages", meta: "MONTHLY PLANS",
    features: ["FB, Insta & TikTok mgmt", "Content & posting", "Page growth & engagement", "Graphics & creatives"],
  },
  {
    num: "/ 07", title: "Digital Marketing", slug: "digital-marketing", icon: "Megaphone",
    tag: "ADS", focus: "Reach More Customers", meta: "CAMPAIGNS",
    features: ["Facebook & Insta ads", "Google & YouTube ads", "Lead generation", "Campaign reporting"],
  },
  {
    num: "/ 08", title: "Overseas Guidance", slug: "overseas-guidance", icon: "Plane",
    tag: "ABROAD", focus: "Study & Work Abroad", meta: "HONEST ADVICE",
    features: ["Study abroad guidance", "Work visa information", "Document support", "Country selection"],
  },
];

export function FlipCardsSection() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const handleTap = (i: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setFlipped((p) => ({ ...p, [i]: !p[i] }));
    }
  };

  return (
    <section id="explore-services" className="fc-sec relative py-20 lg:py-28 bg-navy-dark overflow-hidden">
      {/* subtle gold grid + glows */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-light/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wider uppercase border-gold/40 text-gold">
            <Layers className="h-3 w-3 mr-1.5" /> Explore Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Everything You Need,{" "}
            <span className="text-gradient-gold">In One Place</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Hover any card on desktop — or tap on mobile — to see exactly what each service includes.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
            >
              <div
                className={`flip-card ${flipped[i] ? "flipped" : ""}`}
                onClick={() => handleTap(i)}
              >
                <div className="flip-card-inner">
                  {/* FRONT */}
                  <div className="flip-face flip-front">
                    <div className="fc-visual">
                      <div className="fc-visual-grid" />
                      <div className="fc-visual-glow" />
                      <span className="fc-num">{s.num}</span>
                      <span className="fc-tag">{s.tag}</span>
                      <div className="fc-icon">
                        <ServiceIcon name={s.icon} className="h-9 w-9 text-gold" />
                      </div>
                      <span className="fc-focus">{s.focus}</span>
                      <span className="fc-bignum">{s.num.replace("/ ", "")}</span>
                    </div>
                    <div className="fc-body">
                      <h3 className="fc-title">{s.title}</h3>
                      <div className="fc-meta-row">
                        <span className="fc-meta">{s.meta}</span>
                        <span className="fc-hint">FLIP →</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="flip-face flip-back">
                    <span className="fc-back-label">{s.num} · {s.tag}</span>
                    <h3 className="fc-back-title">{s.title}</h3>
                    <ul className="fc-features">
                      {s.features.map((f) => (
                        <li key={f}>
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="fc-actions">
                      <Link href={`/services/${s.slug}`} className="fc-btn fc-btn-primary">
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="fc-btn fc-btn-ghost">
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scoped flip styles — navy + gold brand */}
      <style>{`
        .fc-sec .flip-card { perspective: 1600px; height: 420px; cursor: pointer; }
        .fc-sec .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform .8s cubic-bezier(.4,.2,.2,1); transform-style: preserve-3d; }
        .fc-sec .flip-card:hover .flip-card-inner,
        .fc-sec .flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
        .fc-sec .flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow: hidden; border-radius: 1rem; background: #1B2A4A; border: 1px solid rgba(200,169,81,.18); }
        .fc-sec .flip-back { transform: rotateY(180deg); }
        .fc-sec .flip-card:hover .flip-front { border-color: rgba(200,169,81,.55); box-shadow: 0 20px 40px -12px rgba(200,169,81,.25); }

        /* FRONT */
        .fc-sec .flip-front { display: flex; flex-direction: column; }
        .fc-sec .fc-visual { position: relative; height: 62%; background: linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 55%, #2C3E6B 100%); display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .fc-sec .fc-visual-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(200,169,81,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,81,.07) 1px,transparent 1px); background-size: 22px 22px; }
        .fc-sec .fc-visual-glow { position: absolute; top: -30px; right: -30px; width: 110px; height: 110px; border-radius: 9999px; background: rgba(200,169,81,.18); filter: blur(34px); }
        .fc-sec .fc-icon { position: relative; width: 70px; height: 70px; border-radius: 1rem; background: rgba(255,255,255,.06); border: 1px solid rgba(200,169,81,.25); display: flex; align-items: center; justify-content: center; transition: transform .5s; }
        .fc-sec .flip-card:hover .fc-icon { transform: scale(1.12); }
        .fc-sec .fc-num { position: absolute; top: .85rem; left: 1rem; font-family: var(--font-mono); font-size: 10px; letter-spacing: .2em; color: #C8A951; }
        .fc-sec .fc-tag { position: absolute; top: .8rem; right: 1rem; padding: 3px 8px; background: rgba(0,0,0,.4); backdrop-filter: blur(4px); border-radius: 4px; font-family: var(--font-mono); font-size: 9px; letter-spacing: .15em; color: #fff; }
        .fc-sec .fc-focus { position: absolute; bottom: .85rem; left: 1rem; right: 1rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: .18em; color: rgba(255,255,255,.45); text-transform: uppercase; }
        .fc-sec .fc-bignum { position: absolute; top: .2rem; right: .6rem; font-size: 3.5rem; font-weight: 900; color: rgba(255,255,255,.04); line-height: 1; user-select: none; }
        .fc-sec .fc-body { flex: 1; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; justify-content: space-between; }
        .fc-sec .fc-title { font-size: 1.15rem; font-weight: 700; line-height: 1.15; color: #fff; margin: 0; }
        .fc-sec .fc-meta-row { display: flex; align-items: center; justify-content: space-between; margin-top: .75rem; padding-top: .75rem; border-top: 1px solid rgba(255,255,255,.08); }
        .fc-sec .fc-meta { font-family: var(--font-mono); font-size: 9px; letter-spacing: .12em; color: rgba(255,255,255,.4); }
        .fc-sec .fc-hint { font-family: var(--font-mono); font-size: 9px; letter-spacing: .12em; color: #C8A951; }

        /* BACK */
        .fc-sec .flip-back { padding: 1.4rem 1.4rem 1.25rem; display: flex; flex-direction: column; background: linear-gradient(160deg, #1B2A4A 0%, #0F1A2E 100%); }
        .fc-sec .fc-back-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: .2em; color: #C8A951; text-transform: uppercase; margin-bottom: .6rem; }
        .fc-sec .fc-back-title { font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 1rem; line-height: 1.1; }
        .fc-sec .fc-features { list-style: none; padding: 0; margin: 0 0 auto; display: flex; flex-direction: column; gap: .6rem; }
        .fc-sec .fc-features li { display: flex; align-items: center; gap: .6rem; font-size: 13px; color: rgba(255,255,255,.82); line-height: 1.3; }
        .fc-sec .fc-actions { display: flex; gap: .5rem; margin-top: 1rem; }
        .fc-sec .fc-btn { display: inline-flex; align-items: center; justify-content: center; gap: .35rem; flex: 1; height: 38px; border-radius: .55rem; font-size: 12px; font-weight: 600; transition: all .25s; }
        .fc-sec .fc-btn-primary { background: #C8A951; color: #0F1A2E; }
        .fc-sec .fc-btn-primary:hover { background: #D4BA6E; }
        .fc-sec .fc-btn-ghost { background: rgba(255,255,255,.06); color: #fff; border: 1px solid rgba(255,255,255,.14); }
        .fc-sec .fc-btn-ghost:hover { border-color: #C8A951; color: #C8A951; }

        @media (max-width: 768px) { .fc-sec .flip-card { height: 400px; } }
      `}</style>
    </section>
  );
}