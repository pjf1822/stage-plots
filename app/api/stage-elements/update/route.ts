import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  try {
    const { stage_elements } = await req.json();
    const { data, error } = await supabase
      .from("stage_elements")
      .upsert(stage_elements, { onConflict: "id" })
      .select();

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
