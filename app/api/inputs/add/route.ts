import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { stage_plot_id, inputs } = await req.json();

  console.log(inputs, "the inputds");
  const { data, error } = await supabase
    .from("inputs")
    .insert(
      inputs.map((input: any) => ({
        ...input,
        stage_plot_id,
      }))
    )
    .select();

  if (error) {
    return NextResponse.json(
      { message: "Failed to add new inputs", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Inputs added and processed successfully",
      addedInputs: data,
    },
    { status: 200 }
  );
}
