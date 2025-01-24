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
    .select(...Object.keys(updateStagePlotData));

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
  console.log(data[0], "hey bitch");

  return NextResponse.json(
    {
      success: true,
      stagePlot: data[0],
    },
    { status: 200 }
  );
}
