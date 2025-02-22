import { FullStagePlot, Input, StageElement } from "@/types";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";
import { getChangedFields } from "@/utils/helpers";

interface NoChangesResponse {
  success: true;
  message: string;
}

type SubmitStagePlotResponse = FullStagePlot | NoChangesResponse;
export const submitStagePlotForm = async (
  originalPlotData: FullStagePlot,
  formData: any
): Promise<SubmitStagePlotResponse> => {
  const changedFields = getChangedFields(originalPlotData, formData);
  if (Object.keys(changedFields).length === 0) {
    return { success: true, message: "No changes were made" };
  }

  const updatePromises: Promise<any>[] = [];
  const updatedPlot: FullStagePlot = { ...originalPlotData };

  // CHECKING THE INITIAL GENERAL STAGE PLOT DATA
  const fieldsToUpdate = ["name", "description", "is_stands_showing"];
  const relevantChanges = Object.keys(changedFields).filter((field) =>
    fieldsToUpdate.includes(field)
  );

  if (relevantChanges.length > 0) {
    const updateData = relevantChanges.reduce(
      (acc, field) => ({ ...acc, [field]: changedFields[field] }),
      {}
    );

    updatePromises.push(
      fetchWithErrorHandling("/api/stage-plots/update", {
        stage_plot_id: originalPlotData.id,
        updateStagePlotData: updateData,
      }).then(() => {
        Object.assign(updatedPlot, updateData);
      })
    );
  }

  // // UPDATE INPUTS
  if (changedFields["inputs"]) {
    const { added, deleted, updated } = changedFields["inputs"];

    if (added.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/add", { inputs: added }).then(
          (response) => {
            updatedPlot.inputs.push(...response.addedInputs); // Add new inputs
          }
        )
      );
    }

    if (deleted.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/delete", { inputs: deleted }).then(
          () => {
            updatedPlot.inputs = updatedPlot.inputs.filter(
              (input) => !deleted.some((del: Input) => del.id === input.id)
            );
          }
        )
      );
    }
    if (updated.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/inputs/update", {
          stage_plot_id: originalPlotData.id,
          inputs: updated,
        }).then(() => {
          updatedPlot.inputs = updatedPlot.inputs.map((input) => {
            const updatedInput = updated.find(
              (upd: Input) => upd.id === input.id
            );
            return updatedInput ? { ...input, ...updatedInput } : input;
          });
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
        }).then((response) => {
          updatedPlot.stage_elements.push(...response.addedStageElements); // Add new stage elements
        })
      );
    }
    // Handle updated stage elements
    if (updated.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/stage-elements/update", {
          stage_elements: updated,
        }).then(() => {
          updatedPlot.stage_elements = updatedPlot.stage_elements.map(
            (element) => {
              const updatedElement = updated.find(
                (upd: StageElement) => upd.id === element.id
              );
              return updatedElement
                ? { ...element, ...updatedElement }
                : element;
            }
          );
        })
      );
    }

    if (deleted.length > 0) {
      updatePromises.push(
        fetchWithErrorHandling("/api/stage-elements/delete", {
          stage_elements: deleted,
        }).then(() => {
          updatedPlot.stage_elements = updatedPlot.stage_elements.filter(
            (element) =>
              !deleted.some((del: StageElement) => del.id === element.id)
          );
        })
      );
    }
  }

  try {
    await Promise.all(updatePromises);
    return updatedPlot; // Return the updated plot after all changes
  } catch (error: any) {
    throw new Error(error.message || "Error updating stage plot");
  }
};
