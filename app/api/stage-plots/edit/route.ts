import { createClient } from "@/utils/supabase/server"; // Adjust the import based on your setup
import { NextRequest, NextResponse } from "next/server"; // Correct imports for Next.js 13+ API routes

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Get the current user (assuming they're authenticated)
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { name, description, inputs, stagePlotId } = await req.json();
  // Check if stage plot already exists (by name or id)
  const { data: existingStagePlot, error: stagePlotError } = await supabase
    .from("stage_plots")
    .select("*")
    .eq("id", stagePlotId) // Check by ID instead of name
    .single(); // Using .single() to get a single record

  if (stagePlotError && stagePlotError.code !== "PGRST116") {
    // If there's an error other than "No data found", return error
    return NextResponse.json(
      {
        message: "Error checking for existing stage plot",
        error: stagePlotError.message,
      },
      { status: 500 }
    );
  }

  // If a stage plot exists, update it; otherwise, insert a new one
  let stagePlotData;
  if (existingStagePlot) {
    // Update the existing stage plot
    const { data, error } = await supabase
      .from("stage_plots")
      .update({ description })
      .eq("id", existingStagePlot.id)
      .select();

    if (error) {
      return NextResponse.json(
        { message: "Failed to update stage plot", error: error.message },
        { status: 500 }
      );
    }
    stagePlotData = data;
  } else {
    // Insert a new stage plot
    const { data, error } = await supabase
      .from("stage_plots")
      .insert([
        {
          name,
          description,
          created_by: user.user.id,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { message: "Failed to create stage plot", error: error.message },
        { status: 500 }
      );
    }
    stagePlotData = data;
  }

  // Insert or update the inputs for the stage plot
  const inputListData = inputs.map((input: { name: string; type: string }) => ({
    stage_plot_id: stagePlotData[0].id, // Associating input with the new or updated stage plot
    name: input.name,
    type: input.type || "", // If no type is provided, default to empty string
  }));

  const { error: inputError } = await supabase
    .from("inputs")
    .upsert(inputListData, { onConflict: ["stage_plot_id", "name"] });

  if (inputError) {
    return NextResponse.json(
      { message: "Failed to add inputs", error: inputError.message },
      { status: 500 }
    );
  }

  // Return success response
  return NextResponse.json(
    {
      message: "Stage plot and inputs processed successfully",
      stagePlot: stagePlotData,
    },
    { status: 200 }
  );
}
