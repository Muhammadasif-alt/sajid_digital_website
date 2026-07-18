import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SITE_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-2159056873710145";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.sajaddigitalservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  verification: {
    google: "IvxbHAkJccapR6z4u9-GsSZN3LpOUAsybnyzfbsusi0",
  },
  title: {
    default: "Sajad Digital Services | Jobs, Careers & Digital Services in Lodhran, Pakistan",
    template: "%s | Sajad Digital Services",
  },
  description:
    "Sajad Digital Services (SDS), Lodhran — job assistance, government & overseas job updates, career counseling, CV writing, foreign scholarships, freelancing, website design and digital marketing across Pakistan.",
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Sajad Digital Services" }],
  creator: "Sajad Digital Services",
  publisher: "Sajad Digital Services",
  category: "Digital Services",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Sajad Digital Services | Jobs, Careers & Digital Services in Lodhran",
    description:
      "Your trusted partner in Lodhran for jobs, career guidance, overseas opportunities and complete digital services across Pakistan.",
    url: SITE_URL,
    siteName: "Sajad Digital Services",
    type: "website",
    locale: "en_PK",
    images: [{ url: `${SITE_URL}/logo.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajad Digital Services | Jobs, Careers & Digital Services in Lodhran",
    description:
      "Jobs, career guidance, overseas opportunities and complete digital services across Pakistan.",
    images: [`${SITE_URL}/logo.png`],
  },
  // Google AdSense site verification meta tag.
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense — literal tag so the verification crawler sees it in raw HTML */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Structured data — helps Google identify the business & link the site to its Google profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}/#business`,
              name: "Sajad Digital Services",
              alternateName: "SDS Lodhran",
              image: `${SITE_URL}/logo.png`,
              logo: `${SITE_URL}/logo.png`,
              url: SITE_URL,
              telephone: "+92-300-7033832",
              email: "sajaddigitalservices@gmail.com",
              priceRange: "$$",
              description:
                "Sajad Digital Services (SDS), Lodhran — job assistance, government & overseas job updates, career counseling, CV writing, foreign scholarships, freelancing, website design and digital marketing across Pakistan.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Opposite DC Office, Ghalla Mandi Road",
                addressLocality: "Lodhran",
                addressRegion: "Punjab",
                postalCode: "59320",
                addressCountry: "PK",
              },
              areaServed: [
                { "@type": "City", name: "Lodhran" },
                { "@type": "Country", name: "Pakistan" },
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/share/18qNMa4FNx/",
                "https://www.instagram.com/sajaddigitalservices",
                "https://www.tiktok.com/@sajaddigitalservices",
              ],
            }),
          }}
        />
        {/* Organization + WebSite so Google can build the brand knowledge panel and sitelinks searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Sajad Digital Services",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-300-7033832",
                contactType: "customer service",
                areaServed: "PK",
                availableLanguage: ["Urdu", "English"],
              },
              sameAs: [
                "https://www.facebook.com/share/18qNMa4FNx/",
                "https://www.instagram.com/sajaddigitalservices",
                "https://www.tiktok.com/@sajaddigitalservices",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Sajad Digital Services",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/jobs?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}