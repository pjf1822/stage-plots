import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const supabase = await createClient();
  try {
    const stageElements = await req.json();

    const { data, error } = await supabase
      .from("stage_elements")
      .upsert(stageElements, { onConflict: "id" }) // Specify `id` for conflict resolution
      .select();

    console.log(data, error, "what the fuck");
    return NextResponse.json(
      { message: "Stage elements updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating stage elements", error: error.message },
      { status: 500 }
    );
  }
}
