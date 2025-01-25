"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

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
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
