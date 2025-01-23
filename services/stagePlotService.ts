import { FullStagePlot } from "@/types";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import { getChangedFields } from "@/utils/helpers";

export const submitStagePlotForm = async (
  originalPlotData: FullStagePlot,
  formData: any
): Promise<any[]> => {
  const changedFields = getChangedFields(originalPlotData, formData);

  console.log(changedFields, "are the fields changed");
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

    if (added.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/add", {
          stage_plot_id: originalPlotData.id,
          inputs: added,
        })
      );
    }

    if (deleted.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/delete", {
          inputs: deleted,
        })
      );
    }

    if (updated.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/update", {
          stage_plot_id: originalPlotData.id,
          inputs: updated,
        })
      );
    }
  }

  if (changedFields["stage_elements"]) {
    const { added, updated, deleted } = changedFields["stage_elements"];

    if (added.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/stage-elements/create", {
          stage_elements: added,
        })
      );
    }

    if (updated.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/stage-elements/update", {
          stage_elements: updated,
        })
      );
    }
    if (deleted.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/stage-elements/delete", {
          stage_elements: deleted,
        })
      );
    }
  }

  try {
    const results = await Promise.all(updatePromises);
    return results;
  } catch (error: any) {
    throw new Error(error.message || "Error updating stage plot");
  }
};
