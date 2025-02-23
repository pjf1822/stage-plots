import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  // Get search parameters from the URL
  const { pathname } = request.nextUrl;
  const id = pathname.split("/").pop();

  const { error: inputError } = await supabase
    .from("inputs")
    .delete()
    .eq("stage_plot_id", id);

  if (inputError) {
    return NextResponse.json(
      { message: "Failed to delete inputs", error: inputError.message },
      { status: 500 }
    );
  }

  const { error: elementError } = await supabase
    .from("stage_elements")
    .delete()
    .eq("stage_plot_id", id);

  if (elementError) {
    return NextResponse.json(
      {
        message: "Failed to delete stage elements",
        error: elementError.message,
      },
      { status: 500 }
    );
  }

  const { error: stagePlotError } = await supabase
    .from("stage_plots")
    .delete()
    .eq("id", id);

  if (stagePlotError) {
    return NextResponse.json(
      {
        message: "Failed to delete stage plot",
        error: stagePlotError.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: `Successfully deleted stage plot with ID: ${id}` },
    { status: 200 }
  );
}
