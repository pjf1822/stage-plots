import { createClient } from "@/utils/supabase/server";
import { updateInputList } from "@/utils/updateInputList";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { stage_plot_id, updateData } = await req.json();

  const fieldsToUpdate = Object.keys(updateData).reduce((acc, key) => {
    if (updateData[key]) {
      acc[key] = updateData[key];
    }
    return acc;
  }, {} as Record<string, any>);

  const { data, error } = await supabase
    .from("stage_plots")
    .update(fieldsToUpdate)
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
