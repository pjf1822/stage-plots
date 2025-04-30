import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { plotToDuplicate } = await request.json();

  const {
    id,
    name,
    description,
    created_by,
    is_outputs_showing,
    is_stands_showing,
    inputs,
    outputs,
    stage_elements,
  } = plotToDuplicate;

  const { data: newPlotData, error: plotError } = await supabase
    .from("stage_plots")
    .insert([
      {
        name: `${name}`,
        description,
        created_by,
        is_outputs_showing,
        is_stands_showing,
      },
    ])
    .select()
    .single();

  if (plotError) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create new plot",
        error: plotError.message,
      },
      { status: 500 }
    );
  }
  const newPlotId = newPlotData.id;

  const duplicatedInputs = inputs.map((input: any) => {
    const { id, ...inputWithoutId } = input;
    return { id: uuidv4(), ...inputWithoutId, stage_plot_id: newPlotId };
  });

  const duplicatedOutputs = outputs.map((output: any) => {
    const { id, ...outputWithoutId } = output;
    return { id: uuidv4(), ...outputWithoutId, stage_plot_id: newPlotId };
  });

  const duplicatedStageElements = stage_elements.map((element: any) => {
    const { id, ...elementWithoutId } = element;
    return { id: uuidv4(), ...elementWithoutId, stage_plot_id: newPlotId };
  });

  console.log(duplicatedStageElements, stage_elements);
  const { error: inputError } = await supabase
    .from("inputs")
    .insert(duplicatedInputs);

  if (inputError) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to duplicate inputs",
        error: inputError.message,
      },
      { status: 500 }
    );
  }

  const { error: outputError } = await supabase
    .from("outputs")
    .insert(duplicatedOutputs);

  if (outputError) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to duplicate outputs",
        error: outputError.message,
      },
      { status: 500 }
    );
  }

  const { error: stageElementError } = await supabase
    .from("stage_elements")
    .insert(duplicatedStageElements);

  if (stageElementError) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to duplicate stage elements",
        error: stageElementError.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Plot duplicated successfully",
      newPlot: newPlotData,
    },
    { status: 200 }
  );
}
