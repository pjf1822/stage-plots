"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <>
      <Head>
        <title>
          Stage Plotter - Create, Manage & Share Professional Stage Plots
        </title>
        <meta
          name="description"
          content="Stage Plotter helps production teams create, manage, and share professional stage plots effortlessly. Visualize your setup, communicate with your team, and streamline your workflow."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Stage Plotter - Create, Manage & Share Professional Stage Plots"
        />
        <meta
          property="og:description"
          content="Stage Plotter helps production teams create, manage, and share professional stage plots effortlessly. Visualize your setup, communicate with your team, and streamline your workflow."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/newlogo.png" />
        <meta name="twitter:card" content="/newlogo.png" />
        <meta
          name="twitter:title"
          content="Stage Plotter - Create, Manage & Share Professional Stage Plots"
        />
        <meta
          name="twitter:description"
          content="Stage Plotter helps production teams create, manage, and share professional stage plots effortlessly. Visualize your setup, communicate with your team, and streamline your workflow."
        />
        <meta name="twitter:image" content="/newlogo.png" />
      </Head>

      <div className="flex flex-col justify-around items-center min-h-screen bg-black p-6">
        <Image
          src="/newlogo.png"
          alt="Logo"
          width={250}
          height={250}
          className="mb-0 rounded-full w-[280px] h-auto sm:w-[300px] sm:h-auto lg:w-[500px] lg:h-auto transform -translate-y-10"
          priority
          loading="eager"
        />
        {/* App Description */}
        <div className="text-center text-white max-w-2xl font-urbanist transform -translate-y-20">
          <h1 className="sr-only">STAGE PLOTTER</h1>
          <h2 className="text-xl text-gray-300 font-urbanist">
            Stage Plotter is a platform for musicians and production people to
            create, manage, and share professional stage plots effortlessly.
          </h2>
        </div>
        <div className="flex space-x-4 mt-6">
          <Button
            onClick={handleGoogleSignIn}
            className="z-10 px-12 py-6 text-xl rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
          >
            Sign in with Google
          </Button>
          <Button
            asChild
            className="z-10 px-12 py-6 text-xl rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
          >
            <Link href="/quickPlot">Make a Quick Plot</Link>
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 text-sm text-gray-300">
          <Link
            href="/privacy"
            className="underline hover:text-white font-urbanist"
          >
            Privacy Policy
          </Link>
        </div>
        <Link
          href="https://buymeacoffee.com/pforbeswebdev"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 left-6 z-50"
        >
          <Button variant="outline" className="p-0 rounded-full shadow-lg">
            <Image
              src="/bmc-button.png"
              alt="Buy Me a Coffee"
              width={120}
              height={40}
              className="rounded-full  scale-125"
            />
          </Button>
        </Link>
      </div>
    </>
  );
}
