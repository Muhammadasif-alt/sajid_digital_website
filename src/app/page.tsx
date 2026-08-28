import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { JobsCarouselSection } from "@/components/sections/jobs-carousel";
import { AnnouncementsSection } from "@/components/sections/announcements";
import { FreeServicesSection } from "@/components/sections/free-services";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { AboutSection } from "@/components/sections/about";
import { CounterSection } from "@/components/sections/counter";
import { PartnersSection } from "@/components/sections/partners";
import { SuccessStoriesSection } from "@/components/sections/success-stories";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <JobsCarouselSection />
        <AnnouncementsSection />
        <FreeServicesSection />
        <WhyChooseUsSection />
        <AboutSection />
        <CounterSection />
        <SuccessStoriesSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}