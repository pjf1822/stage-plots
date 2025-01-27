"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPlotById(plotid: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("stage_plots")
      .select(
        `
      *,
      inputs (*),
      stage_elements (*)
    `
      )
      .eq("id", plotid)
      .single();

    if (error || !data) {
      return { error: error?.message || "Stage plot not found." };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
