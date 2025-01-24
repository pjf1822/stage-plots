import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { inputs } = await req.json();

  const { data, error } = await supabase
    .from("inputs")
    .insert(
      inputs.map((input: any) => ({
        ...input,
      }))
    )
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
      addedInputs: data,
    },
    { status: 200 }
  );
}
