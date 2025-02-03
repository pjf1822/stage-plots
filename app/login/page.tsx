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
    <div className="flex flex-col justify-around items-center min-h-screen bg-themeFive p-6">
      <Image
        src="/logo.png"
        alt="Logo"
        width={400}
        height={400}
        className="mb-4 rounded-full w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]"
      />
      <Card className="w-full max-w-xs sm:max-w-sm p-4 sm:p-6 shadow-xl rounded-lg bg-themeOne">
        <Button
          onClick={handleGoogleSignIn}
          className="w-full bg-themeFive text-themeOne hover:bg-themeOne hover:text-themeFive transition-colors py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-lg sm:text-xl font-urbanist flex justify-center items-center leading-[1.2] text-center"
        >
          Sign in with Google
        </Button>
      </Card>
      <div className="absolute bottom-4 right-4 text-sm text-gray-300">
        <Link href="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
