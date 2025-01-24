import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { inputs } = await req.json();

  const inputIds = inputs
    .map((input: any) => input.id)
    .filter((id: string) => !!id);

  const { data, error } = await supabase
    .from("inputs")
    .delete()
    .in("id", inputIds)
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
      deletedInputs: data,
    },
    { status: 200 }
  );
}
