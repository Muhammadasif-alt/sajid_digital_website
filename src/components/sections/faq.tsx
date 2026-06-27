"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What services does Sajad Digital Services offer?",
    a: "We provide job assistance, career counseling, CV/resume writing, online job applications, professional profile building, scholarship guidance, overseas job support, freelancing setup, digital branding, social media and graphic design services — all under one roof.",
  },
  {
    q: "How do I apply for a job listed on your website?",
    a: "Open any job from the Jobs page, read the details, and tap the WhatsApp Apply button. Your message goes straight to our team and we guide you through the rest of the process.",
  },
  {
    q: "Are your services free?",
    a: "Under our MoU partnerships, several services are free for disabled persons and some government employees. Other services are paid — affordable rates are shared on WhatsApp before you commit to anything.",
  },
  {
    q: "Do you help with overseas / abroad jobs?",
    a: "Yes. We share genuine overseas opportunities (Gulf and beyond) and assist with documentation, profile preparation and the application process so you can apply with confidence.",
  },
  {
    q: "How long does it take to get a response after I contact you?",
    a: "We usually respond within 24 hours. For urgent queries, message us directly on WhatsApp at 0315-7033832 for the fastest reply.",
  },
  {
    q: "Can I get help building my CV and professional profile?",
    a: "Absolutely. Our team writes ATS-friendly CVs and builds strong professional profiles (LinkedIn and more) that help you stand out to employers in Pakistan and overseas.",
  },
  {
    q: "How do I trust that the jobs you post are real?",
    a: "We verify postings before publishing and clearly mark government, private and overseas roles. We never ask for money to 'guarantee' a government job — beware of anyone who does.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-xs font-bold tracking-wider uppercase border-gold/40 text-gold">
            <HelpCircle className="h-3.5 w-3.5 mr-1" /> FAQs
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Frequently Asked{" "}
            <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Everything you need to know before getting started with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/60 rounded-xl bg-card px-5 data-[state=open]:border-gold/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}