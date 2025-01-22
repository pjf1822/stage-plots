import { StagePlotWithInputs } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getPlotById(plotid: string) {
  try {
    const supabase = await createClient();

    const { data: stagePlot, error: stagePlotError } = await supabase
      .from("stage_plots")
      .select("*")
      .eq("id", plotid)
      .single();

    const { data: inputs, error: inputsError } = await supabase
      .from("inputs")
      .select("*")
      .eq("stage_plot_id", plotid);

    const { data: stageElements, error: stageElementsError } = await supabase
      .from("stage_elements")
      .select("*")
      .eq("stage_plot_id", plotid);

    if (stagePlotError || !stagePlot) {
      return { error: stagePlotError?.message || "Stage plot not found." };
    }
    if (inputsError) {
      return { error: inputsError.message };
    }
    if (stageElementsError) {
      return { error: stageElementsError.message };
    }
    const result: StagePlotWithInputs = {
      ...stagePlot,
      inputs: inputs || [],
      stage_elements: stageElements || [], // Adding the stage elements to the result
    };
    return { result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
