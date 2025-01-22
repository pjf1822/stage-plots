import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Get the current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized: User must be logged in" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("stage_plots")
    .insert([
      {
        name: "test nanme",
        description: "desc",
        created_by: user.id, // Include the user ID
      },
    ])
    .select();
  if (error) {
    return NextResponse.json(
      { message: "Failed to create stage plot", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Stage plot created successfully", stagePlot: data[0] },
    { status: 200 }
  );
}
