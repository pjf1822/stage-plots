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

  const { name, description, inputList } = await req.json();

  console.log(name, "do we have the namae", user.user);
  const { data: stagePlotData, error: stagePlotError } = await supabase
    .from("stage_plots")
    .insert([
      {
        name,
        description,
        created_by: user.user.id,
      },
    ])
    .select();

  if (stagePlotError) {
    return NextResponse.json(
      { message: "Failed to create stage plot", error: stagePlotError.message },
      { status: 500 }
    );
  }
  const inputListData = inputList.map(
    (input: { name: string; type: string }) => ({
      stage_plot_id: stagePlotData[0].id, // Associating input with the new stage plot
      name: input.name,
      type: input.type || "", // If no type is provided, default to empty string
    })
  );

  const { error: inputError } = await supabase
    .from("inputs")
    .insert(inputListData);

  if (inputError) {
    return NextResponse.json(
      { message: "Failed to add inputs", error: inputError.message },
      { status: 500 }
    );
  }

  // Step 3: Return success response
  return NextResponse.json(
    {
      message: "Stage plot and inputs created successfully",
      stagePlot: stagePlotData,
    },
    { status: 200 }
  );
}
