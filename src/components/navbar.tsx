"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ArrowRight, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "/services" },
  { label: "Why SDS", href: "#why-choose" },
  { label: "About Us", href: "/about" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function useNavClick() {
  const router = useRouter();
  const pathname = usePathname();
  return useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        if (pathname === "/") {
          // Already on the home page: just scroll, never append to the URL hash
          // (this is what caused the /#home#home stacking).
          if (href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", "/");
          } else {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          router.push("/" + href);
        }
      } else {
        router.push(href);
      }
    },
    [pathname, router]
  );
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/** White ⇄ Navy-blue mood toggle */
function MoodToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;
  const isNavy = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isNavy ? "light" : "dark")}
      aria-label="Toggle white / navy mood"
      title={isNavy ? "Switch to White mood" : "Switch to Navy mood"}
      className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold/40 transition-all ${className}`}
    >
      {isNavy ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}

function NavDesktop() {
  const [scrolled, setScrolled] = useState(false);
  const handleNavClick = useNavClick();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center group flex-shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Sajad Digital Services" className="h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          </a>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-[15px] font-semibold text-foreground/75 hover:text-gold transition-colors rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <MoodToggle />
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-gold-gradient text-navy-dark rounded-xl font-bold h-11 px-5 shadow-md shadow-gold/20"
            >
              Get Started <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function NavMobile() {
  const [open, setOpen] = useState(false);
  const baseClick = useNavClick();
  const handleNavClick = (href: string) => {
    setOpen(false);
    baseClick(href);
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Sajad Digital Services" className="h-14 w-auto object-contain" />
          </a>

          <div className="flex items-center gap-2">
            <MoodToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0 bg-background">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center px-5 py-4 border-b border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="Sajad Digital Services" className="h-14 w-auto object-contain" />
                  </div>

                  <nav className="flex-1 overflow-y-auto py-4 px-3">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        className="w-full flex items-center px-3 py-3 text-base font-semibold text-foreground hover:bg-gold/10 hover:text-gold rounded-lg transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>

                  <div className="p-4 border-t border-border space-y-3">
                    <Button
                      onClick={() => handleNavClick("#contact")}
                      className="w-full bg-gold-gradient text-navy-dark rounded-xl font-bold"
                    >
                      Get Started <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
}