import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Provider from "@/utils/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import MobileDisclaimer from "./components/MobileDisclaimer";

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
  description: "Plotting made easy",
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
          <MobileDisclaimer />
          {children}
          <SpeedInsights />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
