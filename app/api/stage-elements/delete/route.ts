import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { stage_elements } = await req.json(); // Renamed inputs to stateElements

  const elementIds = stage_elements
    .map((element: any) => element.id)
    .filter((id) => !!id);

  console.log(elementIds, "show me the stuff");
  const { data, error } = await supabase
    .from("stage_elements")
    .delete()
    .in("id", elementIds)
    .select();
  if (error) {
    return NextResponse.json(
      { message: "Failed to delete stage elements", error: error.message },
      { status: 500 }
    );
  }
  console.log(data, error);

  return NextResponse.json(
    {
      message: "stage elements deleted successfully",
      deletedElements: data,
    },
    { status: 200 }
  );
}
