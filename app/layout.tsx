import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Provider from "@/utils/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import MobileDisclaimer from "./components/MobileDisclaimer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist", // Font variable name
  subsets: ["latin"], // Define subsets
  weight: ["400", "700"], // Specify the font weight
});

export const metadata: Metadata = {
  title: "Stage plotter",
  description: "Quick. Easy. Professional Stage Plots",
  keywords: [
    "stage plot",
    "stage plot pro",
    "stage plot online",
    "stage plot gratis",
    "stage plot free",
    "crear stage plot online gratis",
    "stage plot maker",
    "stage plot builder",
    "stage plot creator",
    "stage plot designer",
    "stage plot software",
    "stage plot drawing",
    "stage plot without registration",
    "stage plot 3d",
    "band setup",
    "bands",
    "musicians",
    "live performance",
    "production",
    "live sound",
    "stageplotpro",
    "rider maker",
    "stageplotmaker",
    "online stage plot maker",
  ],
  metadataBase: new URL("https://thestageplotter.com"),
  authors: [{ name: "Peter Forbes", url: "https://github.com/pjf1822" }],
  creator: "Peter Forbes",
  applicationName: "Stage Plotter",
  openGraph: {
    title: "Stage Plotter",
    description: "Quick. Easy. Professional Stage Plots",
    url: "https://www.thestageplotter.com",
    siteName: "Stage Plotter",
    images: [
      {
        url: "/newlogo.png",
        width: 1200,
        height: 630,
        alt: "Stage Plotter Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@pforbeswebdev12576",
    creator: "@peterforbes",
    title: "Stage Plotter",
    description: "Quick. Easy. Professional Stage Plots",
    images: ["/newlogo.png"], // Stored in /public
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/newlogo.png",
    shortcut: "/newlogo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Stage Plotter",
      url: "https://www.thestageplotter.com",
      description: "Quick. Easy. Professional Stage Plots",
      publisher: {
        "@type": "Organization",
        name: "Stage Plotter",
        logo: {
          "@type": "ImageObject",
          url: "/newlogo.png",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${urbanist.variable}  antialiased bg-black`}
      >
        <Provider>
          <Navbar />
          {children}
          <SpeedInsights />
          <Toaster />
        </Provider>
        <Analytics />
        <MobileDisclaimer />
        <GoogleAnalytics gaId="G-GDCC7LPM64" />
      </body>
    </html>
  );
}
