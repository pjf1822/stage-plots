import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const response = await req.json(); // Expecting an array of elements

  const insertPromises = response.map((element: any) => {
    return supabase
      .from("stage_elements") // Assuming you have a table `stage_elements` to store positions
      .insert([
        {
          x: element.x,
          y: element.y,
          title: element.title,
          stage_plot_id: element.stage_plot_id,
        },
      ]);
  });
  try {
    const results = await Promise.all(insertPromises);

    // Flatten the results into a single array of inserted elements
    const insertedElements = results.flatMap((result) => result.data);

    return NextResponse.json(
      {
        message: "Stage elements created successfully",
        data: insertedElements,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create stage elements", error: error.message },
      { status: 500 }
    );
  }
}
