import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const response = await req.json(); // Expecting an array of elements

    console.log("Request payload:", response); // Log incoming data

    const insertPromises = response.map((element: any) => {
      console.log("Inserting element:", element); // Log each element being inserted
      return supabase
        .from("stage_elements") // Assuming you have a table `stage_elements`
        .insert([
          {
            x: element.x,
            y: element.y,
            title: element.title,
            stage_plot_id: element.stage_plot_id,
          },
        ])
        .select();
    });

    const results = await Promise.all(insertPromises);

    const insertedElements = results.flatMap((result) => result.data);

    return NextResponse.json(
      {
        message: "Stage elementsd created succedssfully",
        data: insertedElements,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Unexpected error:", error.message); // Log the actual error
    return NextResponse.json(
      { message: "Failed to create stage elements", error: error.message },
      { status: 500 }
    );
  }
}
