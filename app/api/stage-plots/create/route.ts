import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized: User must be logged in" },
      { status: 401 }
    );
  }

  const { data: stagePlotData, error: stagePlotError } = await supabase
    .from("stage_plots")
    .insert([
      {
        name: "",
        description: "",
      },
    ])
    .select();

  if (stagePlotError) {
    return NextResponse.json(
      { message: "Failed to create stage plot", error: stagePlotError.message },
      { status: 500 }
    );
  }
  const { data: inputData, error: inputError } = await supabase
    .from("inputs")
    .insert([
      {
        stage_plot_id: stagePlotData[0].id,
        name: "Kick",
        mic: "",
        channel: 1,
      },
    ])
    .select();

  if (inputError) {
    return NextResponse.json(
      {
        message: "Stage plot created but failed to add input",
        error: inputError.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Stage plot created successfully", stagePlot: stagePlotData[0] },
    { status: 200 }
  );
}
