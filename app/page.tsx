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
          className="mb-0 rounded-full w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] transform -translate-y-10"
        />
        {/* App Description */}
        <div className="text-center text-white max-w-2xl font-urbanist transform -translate-y-20">
          <p className="text-xl text-gray-300 font-urbanist">
            Stage Plotter is a platform for musicians production people to
            create, manage, and share professional stage plots effortlessly.
            Visualize your stage setup, communicate with your team, and simplify
            your workflow.
          </p>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="z-10 px-12 py-6 text-xl rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
        >
          Sign in with Google
        </Button>
        <div className="absolute bottom-4 right-4 text-sm text-gray-300">
          <Link
            href="/privacy"
            className="underline hover:text-white font-urbanist"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}
