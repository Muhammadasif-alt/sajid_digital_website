import {
  Compass,
  FileText,
  Briefcase,
  Send,
  TrendingUp,
  Share2,
  Megaphone,
  Plane,
  HeartHandshake,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  FileText,
  Briefcase,
  Send,
  TrendingUp,
  Share2,
  Megaphone,
  Plane,
  HeartHandshake,
  Globe,
};

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = (name && ICON_MAP[name]) || Sparkles;
  return <Icon className={className} />;
}