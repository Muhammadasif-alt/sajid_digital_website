import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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