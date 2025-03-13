import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { outputs } = await req.json();

  const { data, error } = await supabase
    .from("outputs")
    .upsert(outputs, { onConflict: "id" })
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      upsertedOutputs: data,
    },
    { status: 200 }
  );
}
