import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();

    const { error: shitError } = await supabase
      .from("fuckinlogs")
      .insert({ log_data: `0   ${code} and fucking ${next}` });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        const { error: shitError } = await supabase
          .from("fuckinlogs")
          .insert({ log_data: `1   ${origin}` });

        // we can be sure that there is n load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        const { error: shitError } = await supabase
          .from("fuckinlogs")
          .insert({ log_data: `2   ${forwardedHost} and${next}` });

        return NextResponse.redirect(`https://thestageplotter.com/dashboard`);
      } else {
        const { error: shitError } = await supabase
          .from("fuckinlogs")
          .insert({ log_data: `3 ${origin} and${next}` });

        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
