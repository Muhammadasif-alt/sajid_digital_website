import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP =
  "https://wa.me/923157033832?text=" +
  encodeURIComponent("Assalam-o-Alaikum! I would like to know more about your services.");

interface CtaBandProps {
  title?: string;
  subtitle?: string;
}

/**
 * Slim closing call-to-action for inner pages. The full contact form lives on
 * the home page and /contact only — inner pages just point people there.
 */
export function CtaBand({
  title = "Have a question? Let's talk.",
  subtitle = "Message us on WhatsApp for a quick reply, or send us your details and our team will get back to you.",
}: CtaBandProps) {
  return (
    <section className="py-14 lg:py-20 bg-muted/30 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">{title}</h2>
        <p className="mt-3 text-muted-foreground text-lg">{subtitle}</p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl px-7 font-bold shadow-md shadow-[#25D366]/25"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" /> Chat on WhatsApp
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-xl px-7 font-bold border-gold/40 text-foreground hover:border-gold hover:text-gold"
          >
            <Link href="/contact">
              Contact Us <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
