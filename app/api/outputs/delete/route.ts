import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { outputs } = await req.json();

  const outputIds = outputs
    .map((output: any) => output.id)
    .filter((id: string) => !!id);

  const { data, error } = await supabase
    .from("outputs")
    .delete()
    .in("id", outputIds)
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
      deletedOutputs: data,
    },
    { status: 200 }
  );
}
