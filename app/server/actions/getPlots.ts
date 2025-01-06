"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPlots() {
  try {
    const supabase = await createClient();

    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("stage_plots")
      .select("*")
      .eq("created_by", user?.user?.id);
    return { data };
  } catch (error) {
    return { error: error.message }; // Optionally return an error object for better error handling
  }
}
