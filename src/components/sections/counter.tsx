"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FileCheck2, Trophy, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "Happy Clients" },
  { icon: FileCheck2, value: 25000, suffix: "+", label: "Applications Processed" },
  { icon: Trophy, value: 98, suffix: "%", label: "Success Rate" },
  { icon: Clock, value: 5, suffix: "+", label: "Years of Experience" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CounterSection() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-navy-dark via-navy to-navy-dark overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center">
                <s.icon className="h-7 w-7 text-gold" />
              </div>
              <div className="text-3xl lg:text-4xl font-extrabold text-gold">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/70 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}