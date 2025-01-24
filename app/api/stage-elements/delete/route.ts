import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { stage_elements } = await req.json();

  const elementIds = stage_elements
    .map((element: any) => element.id)
    .filter((id: string) => !!id);

  const { data, error } = await supabase
    .from("stage_elements")
    .delete()
    .in("id", elementIds)
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
      deletedElements: data,
    },
    { status: 200 }
  );
}
