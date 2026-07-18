import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SuccessStoriesGrid } from "@/components/sections/success-stories-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata, breadcrumbLd, ldJson, SITE_URL } from "@/lib/seo";
import { Trophy, BadgeCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Success Stories",
  description:
    "Real success stories from Sajad Digital Services, Lodhran — students and clients selected in Rescue 1122, Punjab Police, City Traffic Police and overseas jobs with our guidance.",
  path: "/success-stories",
  keywords: [
    "Sajad Digital Services success stories",
    "students selected Rescue 1122 Lodhran",
    "Punjab Police selection Lodhran",
    "job success stories Pakistan",
    "SDS student results",
  ],
});

const reasons = [
  "Honest guidance — no false promises, no hidden charges",
  "Real, verified government, private & overseas job updates",
  "Professional CV writing and interview preparation",
  "Official MoUs with Rescue 1122 & District Traffic Police Lodhran",
  "Affordable rates — with free help for disabled persons under MoU",
  "Support that continues until you reach your goal",
];

const faqs = [
  {
    q: "Are these success stories real?",
    a: "Yes. Every story here is a real student or client from Lodhran and across Pakistan who used our services. Many were selected in government departments such as Rescue 1122, Punjab Police and the City Traffic Police.",
  },
  {
    q: "Can you help me get selected like them?",
    a: "We guide you to the right opportunities and help with your application, documentation, CV and interview preparation. Final selection depends on you — but we make sure you apply correctly and are fully prepared.",
  },
  {
    q: "Do you guarantee a government job?",
    a: "No honest service can guarantee a government job, and we never take money for 'guarantees'. We help you apply the right way and prepare well — beware of anyone who promises a sure selection for a fee.",
  },
  {
    q: "Which departments have your students joined?",
    a: "Our students have joined Rescue 1122, Punjab Police, City Traffic Police and more, along with private companies and overseas roles.",
  },
  {
    q: "How can I share my own success story?",
    a: "We love celebrating our students. Message us on WhatsApp at 0315-7033832 and we may feature your story on this page.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Success Stories | Sajad Digital Services",
  url: `${SITE_URL}/success-stories`,
  about: "Real success stories of students and clients guided by Sajad Digital Services, Lodhran.",
};

export default function SuccessStoriesPage() {
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Success Stories", path: "/success-stories" },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(collectionLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(crumbs)} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/92 via-navy-dark/80 to-navy-dark/55" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,81,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,81,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 -right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 relative">
            <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="h-3.5 w-3.5" /> Success Stories
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Students Who <span className="text-gradient-gold">Made It</span>
            </h1>
            <p className="text-white/60 mt-3 max-w-2xl text-lg">
              Real journeys of students and clients from Lodhran and across Pakistan who built their
              careers with Sajad Digital Services.
            </p>
          </div>
        </div>

        {/* Grid with pagination */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SuccessStoriesGrid />
          </div>
        </section>

        {/* Related — image one side, reasons the other */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 to-navy/10 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Images/job-assistance.webp"
                  alt="Students supported by Sajad Digital Services"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
                <BadgeCheck className="h-3.5 w-3.5" /> Why Our Students Succeed
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Behind Every Story Is the <span className="text-gradient-gold">Right Support</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                These results are not luck. Our team stands with every student — from choosing the right
                opportunity to the final interview — so they can apply with confidence.
              </p>
              <ul className="mt-6 space-y-3">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-gold" />
                    </span>
                    <span className="text-foreground/90">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs — native <details> so they're server-rendered & SEO-friendly */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="h-3.5 w-3.5" /> FAQs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Questions About Our <span className="text-gradient-gold">Success Stories</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border border-border/60 rounded-xl bg-card px-5 py-4 open:border-gold/40 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground list-none">
                    {f.q}
                    <span className="ml-4 text-gold transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Your story could be next."
          subtitle="Every success here started with one simple message. Tell us your goal and we'll help you get there."
        />
      </main>
      <Footer />
    </div>
  );
}
