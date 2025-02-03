"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
    <div className="flex flex-col justify-around items-center min-h-screen bg-black p-6">
      <Image
        src="/newlogo.png"
        alt="Logo"
        width={200}
        height={200}
        className="mb-0 rounded-full w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
      />
      <Button
        onClick={handleGoogleSignIn}
        className="z-10 px-8 py-4 text-xl rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
      >
        Sign in with Google
      </Button>
      <div className="absolute bottom-4 right-4 text-sm text-gray-300">
        <Link href="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
