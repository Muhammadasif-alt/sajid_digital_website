import {
  Briefcase,
  UserCheck,
  Award,
  GraduationCap,
  FileText,
  BellRing,
  MonitorSmartphone,
  School,
  Share2,
  TrendingUp,
  Palette,
  MessageCircle,
  Youtube,
  Laptop,
  FileCheck2,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

export const SERVICES_WHATSAPP = "923157033832";

export type Svc = { title: string; icon: LucideIcon; desc: string };

export const SERVICES: Svc[] = [
  { title: "Job Application Assistance", icon: Briefcase, desc: "We help you apply for relevant government & private jobs easily and correctly." },
  { title: "Career Counseling & Guidance", icon: UserCheck, desc: "Personalized career counseling to help you choose the right path and achieve your goals." },
  { title: "Sidora Career Services", icon: Award, desc: "Expert guidance for Sidora jobs & overseas recruitment support." },
  { title: "Overseas Education & Career Guidance", icon: GraduationCap, desc: "Study abroad & build your career with our complete expert support." },
  { title: "CV / Resume Writing & Formatting", icon: FileText, desc: "Professional, ATS-friendly CVs and resumes that make you stand out." },
  { title: "Government & Private Jobs Updates", icon: BellRing, desc: "Timely daily updates about the latest job opportunities across Pakistan." },
  { title: "Online Applications & Registration", icon: MonitorSmartphone, desc: "We handle your online applications & registrations accurately and on time." },
  { title: "Scholarship & Admission Guidance", icon: School, desc: "Find the best scholarships and get complete admission support." },
  { title: "Social Media Marketing", icon: Share2, desc: "Grow your brand on Facebook, TikTok & Instagram with effective strategies." },
  { title: "Digital Branding & Promotion", icon: TrendingUp, desc: "Build a strong online presence and promote your business effectively." },
  { title: "Graphic Designing", icon: Palette, desc: "Creative designs for posts, banners, logos & more." },
  { title: "WhatsApp Business Setup", icon: MessageCircle, desc: "Professional WhatsApp Business setup & automation for your business." },
  { title: "YouTube Channel Setup & Optimization", icon: Youtube, desc: "Start, grow & monetize your YouTube channel with full support." },
  { title: "Freelancing Guidance", icon: Laptop, desc: "Learn in-demand skills and start your freelancing journey." },
  { title: "Document Preparation & Verification", icon: FileCheck2, desc: "All types of document preparation & verification support." },
  { title: "Professional Profile Management", icon: BadgeCheck, desc: "Optimize & manage your online professional presence." },
];

export function serviceWaLink(title: string) {
  const msg = encodeURIComponent(`Assalam o Alaikum, I am interested in your "${title}" service. Please share more details.`);
  return `https://wa.me/${SERVICES_WHATSAPP}?text=${msg}`;
}