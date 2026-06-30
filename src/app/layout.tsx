import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
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
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}