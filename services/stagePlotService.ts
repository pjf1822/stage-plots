// services/stagePlotService.ts

import { StagePlot, StagePlotWithInputs } from "@/types";

export const submitStagePlotForm = async (
  originalPlotData: StagePlot,
  formData: any
): Promise<string> => {
  const updateData: Record<string, any> = {};

  const fieldsToCheck: (keyof StagePlot)[] = ["name", "description"];

  fieldsToCheck.forEach((field) => {
    if (originalPlotData[field] !== formData[field]) {
      updateData[field] = formData[field];
    }
  });

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
