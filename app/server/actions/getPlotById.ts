import { createClient } from "@/utils/supabase/server";

export async function getPlotById(plotid: string) {
  try {
    const supabase = await createClient();

    const { data: stagePlot, error } = await supabase
      .from("stage_plots")
      .select("id, name, description")

      .eq("id", plotid)
      .single();

    const { data: inputs, error: inputsError } = await supabase
      .from("inputs")
      .select("id, name, type") // Adjust fields as needed
      .eq("stage_plot_id", plotid);

    const result = {
      ...stagePlot,
      inputs,
    };

    return { result };
  } catch (error) {
    return { error: error.message }; // Optionally return an error object for better error handling
  }
}
