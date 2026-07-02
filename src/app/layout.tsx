import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
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
  title: "Sajad Digital Services | Career Growth, Digital Success & Overseas Opportunities",
  description:
    "Sajad Digital Services (SDS) — your trusted partner for job assistance, career counseling, CV writing, overseas education guidance, digital marketing and more across Pakistan.",
  keywords: [
    "Sajad Digital Services",
    "job assistance",
    "career counseling",
    "CV writing",
    "overseas education",
    "digital marketing",
    "Pakistan",
  ],
  authors: [{ name: "Sajad Digital Services" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Sajad Digital Services | Empowering Careers, Enhancing Businesses",
    description:
      "Your trusted partner for career growth, digital success & overseas opportunities.",
    type: "website",
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
              "@type": "LocalBusiness",
              name: "Sajad Digital Services",
              image: `${SITE_URL}/logo.png`,
              url: SITE_URL,
              telephone: "+92-300-7033832",
              description:
                "Sajad Digital Services (SDS) — job assistance, career counseling, CV writing, overseas opportunities and digital services across Pakistan.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Opposite DC Office, Ghalla Mandi Road",
                addressLocality: "Lodhran",
                postalCode: "59320",
                addressCountry: "PK",
              },
              sameAs: [
                "https://www.facebook.com/share/18qNMa4FNx/",
                "https://www.instagram.com/sajaddigitalservices",
                "https://www.tiktok.com/@sajaddigitalservices",
              ],
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