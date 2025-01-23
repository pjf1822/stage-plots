import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // DO I NEED TO AUTHENTICATE TEH ROUTES???LIKE DO I HAVE TO LOG IN THE FUCKING USER FOR THIS?
  const { stage_plot_id, updateStagePlotData } = await req.json();

  const { data, error } = await supabase
    .from("stage_plots")
    .update(updateStagePlotData)
    .eq("id", stage_plot_id)
    .select();

  if (error) {
    return NextResponse.json(
      { message: "Failed to update stage plot", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Stage plot and inputs processed successfully",
      stagePlot: data[0],
    },
    { status: 200 }
  );
}
