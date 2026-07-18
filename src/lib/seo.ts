import type { Metadata } from "next";

export const SITE_URL = "https://www.sajaddigitalservices.com";
export const SITE_NAME = "Sajad Digital Services";
export const SITE_TAGLINE = "Careers, Jobs & Digital Services in Lodhran, Pakistan";

// Core keywords the whole site should rank for — the services SDS offers,
// tied to the location so local searches ("... in Lodhran / Pakistan") match.
export const SITE_KEYWORDS = [
  "Sajad Digital Services",
  "SDS Lodhran",
  "digital services Lodhran",
  "digital services Pakistan",
  "job assistance Lodhran",
  "job assistance Pakistan",
  "career counseling Lodhran",
  "CV writing Pakistan",
  "resume writing Lodhran",
  "online job application",
  "government jobs Lodhran",
  "government jobs Pakistan",
  "overseas jobs Pakistan",
  "overseas employment guidance",
  "foreign scholarships Pakistan",
  "study abroad from Pakistan",
  "freelancing training Lodhran",
  "website design Lodhran",
  "website development Pakistan",
  "digital marketing Lodhran",
  "social media marketing Pakistan",
  "graphic design Lodhran",
  "Google business profile setup",
  "business registration Pakistan",
  "YouTube channel setup",
];

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services". Home is "/". */
  path: string;
  keywords?: string[];
  /** Absolute or site-relative image for social previews. */
  image?: string;
  type?: "website" | "article";
}

/**
 * Builds consistent per-page metadata: canonical URL, keyword list, and Open
 * Graph + Twitter cards. Titles flow through the layout template
 * ("<title> | Sajad Digital Services") so pass the bare page title here.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/logo.png",
  type = "website",
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords: [...keywords, ...SITE_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

/** JSON-LD <script> content for a breadcrumb trail. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Renders a JSON-LD object into the string a <script> tag expects. */
export function ldJson(data: unknown) {
  return { __html: JSON.stringify(data) };
}
