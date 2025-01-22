// services/stagePlotService.ts

import { Input, StagePlot, StagePlotWithInputs } from "@/types";

export const submitStagePlotForm = async (
  originalPlotData: StagePlotWithInputs,
  formData: any
): Promise<string> => {
  const updateData: Record<string, any> = {};
  // CHECK STAGE PLOT FIELDS
  const fieldsToCheck: (keyof StagePlot)[] = ["name", "description"];

  fieldsToCheck.forEach((field) => {
    if (originalPlotData[field] !== formData[field]) {
      updateData[field] = formData[field];
    }
  });
  // CHECK FOR STATE PLOT INPUTS
  let updatedInputs: Input[] = [];

  formData.inputs.forEach((input: Input) => {
    const existingInput = originalPlotData.inputs.find(
      (originalInput) =>
        originalInput.name === input.name && originalInput.type === input.type
    );

    if (!input.id) {
      updatedInputs.push(input);
    } else if (
      !existingInput ||
      existingInput.name !== input.name ||
      existingInput.type !== input.type
    ) {
      updatedInputs.push(input);
    }
  });

  if (updatedInputs.length > 0) {
    updateData.inputs = updatedInputs;
  }

  if (!Object.keys(updateData).length)
    return "No changes were made to the stage plot";

  const response = await fetch("/api/stage-plots/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updateData,
      stage_plot_id: originalPlotData.id,
    }),
  });
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    const result = await response.json();
    throw new Error("Error updating stage plot: " + result.message);
  }
};
