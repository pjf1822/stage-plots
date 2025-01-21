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

  const { name, description, inputs, id } = await req.json();

  const { data: existingStagePlot, error: stagePlotError } = await supabase
    .from("stage_plots")
    .select("*")
    .eq("id", id)
    .single();

  if (stagePlotError && stagePlotError.code !== "PGRST116") {
    return NextResponse.json(
      {
        message: "Error checking for existing stage plot",
        error: stagePlotError.message,
      },
      { status: 500 }
    );
  }
  if (!existingStagePlot) {
    return NextResponse.json(
      { message: "Stage plot not found" },
      { status: 404 }
    );
  }

  let stagePlotData;

  const { data, error } = await supabase
    .from("stage_plots")
    .update({ description, name })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json(
      { message: "Failed to update stage plot", error: error.message },
      { status: 500 }
    );
  }

  await updateInputList(inputs, id);

  // Return success response
  return NextResponse.json(
    {
      message: "Stage plot and inputs processed successfully",
      stagePlot: stagePlotData,
    },
    { status: 200 }
  );
}
