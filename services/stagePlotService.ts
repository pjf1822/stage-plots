import { FullStagePlot } from "@/types";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import { getChangedFields } from "@/utils/helpers";

export const submitStagePlotForm = async (
  originalPlotData: FullStagePlot,
  formData: any
): Promise<any[]> => {
  const changedFields = getChangedFields(originalPlotData, formData);

  if (Object.keys(changedFields).length === 0) {
    console.log("No changes detected!");
    return [];
  }

  const updatePromises: Promise<any>[] = [];

  // CHECKING THE INITIAL GENERAL STAGE PLOT DATA
  const fieldsToUpdate = ["name", "description"];
  const relevantChanges = Object.keys(changedFields).filter((field) =>
    fieldsToUpdate.includes(field)
  );

  relevantChanges.forEach((field) => {
    const updatedValue = changedFields[field];
    updatePromises.push(
      fetchWithErrorHandling("/api/stage-plots/update", {
        stage_plot_id: originalPlotData.id,
        updateStagePlotData: { [field]: updatedValue },
      })
    );
  });

  // // UPDATE INPUTS
  if (changedFields["inputs"]) {
    const { added, deleted, updated } = changedFields["inputs"];

    // If there are added inputs, send them to the API
    if (added.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/add", {
          stage_plot_id: originalPlotData.id,
          inputs: added, // The added inputs
        })
      );
    }

    // If there are deleted inputs, send them to the API
    if (deleted.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/delete", {
          inputs: deleted, // The deleted inputs
        })
      );
    }

    // If there are updated inputs, send them to the API
    if (updated.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/update", {
          stage_plot_id: originalPlotData.id,
          inputs: updated, // The updated inputs
        })
      );
    }
  }

  try {
    const results = await Promise.all(updatePromises);
    console.log(results, "what do the results look like in every position");
    return results;
  } catch (error: any) {
    throw new Error(error.message || "Error updating stage plot");
  }
};
