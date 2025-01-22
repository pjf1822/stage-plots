import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { inputs } = await req.json();

  const { data, error } = await supabase
    .from("inputs")
    .upsert(inputs, { onConflict: "id" })
    .select();

  if (error) {
    return NextResponse.json(
      { message: "Failed to upsert inputs", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Inputs upserted successfully",
      upsertedInputs: data,
    },
    { status: 200 }
  );
}
