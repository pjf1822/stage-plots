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

    const sortedInputs = data.inputs.sort(
      (a: any, b: any) => a.channel - b.channel
    );

    return {
      ...data,
      inputs: sortedInputs,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
