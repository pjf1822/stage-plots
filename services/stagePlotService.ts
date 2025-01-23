import {
  FullStagePlot,
  Input,
  StageElement,
  StagePlot,
  StagePlotFormData,
} from "@/types";
import { fetchWithErrorHandling } from "@/utils/fetchWithErrorHandling";

export const submitStagePlotForm = async (
  originalPlotData: FullStagePlot,
  formData: any
): Promise<any[]> => {
  // MASTER CHANGE OBJECT
  const updatePromises: Promise<void>[] = [];
  const updateStagePlotData: Record<string, any> = {};
  const fieldsToCheck: (keyof StagePlot)[] = ["name", "description"];

  // CHECK STAGE PLOT FIELDS
  fieldsToCheck.forEach((field) => {
    if (originalPlotData[field] !== formData[field]) {
      updateStagePlotData[field] = formData[field];
    }
  });

  if (Object.keys(updateStagePlotData).length > 0) {
    updatePromises.push(
      fetchWithErrorHandling("/api/stage-plots/update", {
        stage_plot_id: originalPlotData.id,
        updateStagePlotData,
      })
    );
  }
  // UPDATE INPUTS
  const updatedInputs: Input[] = formData.inputs.filter((input: Input) => {
    const existingInput = originalPlotData.inputs.find(
      (originalInput) => originalInput.id === input.id
    );
    return (
      input.id &&
      existingInput &&
      (existingInput.name !== input.name || existingInput.type !== input.type)
    );
  });
  if (updatedInputs.length > 0) {
    updatePromises.push(
      fetchWithErrorHandling("/api/inputs/update", {
        stage_plot_id: originalPlotData.id,
        inputs: updatedInputs,
      })
    );
  }
  // ADD INPUTS
  const newInputs: Input[] = formData.inputs.filter(
    (input: Input) => !input.id
  );

  if (newInputs.length > 0) {
    updatePromises.push(
      fetchWithErrorHandling("/api/inputs/add", {
        stage_plot_id: originalPlotData.id,
        inputs: newInputs,
      })
    );
  }
  // DELETE INPUTS
  const inputsToDelete: Input[] = originalPlotData.inputs.filter(
    (originalInput) =>
      !formData.inputs.some((input: Input) => input.id === originalInput.id)
  );
  if (inputsToDelete.length > 0) {
    updatePromises.push(
      fetchWithErrorHandling("/api/inputs/delete", {
        inputs: inputsToDelete,
      })
    );
  }

  const newElements = formData.stage_elements.filter(
    (el) => typeof el.id === "string"
  );

  if (newElements.length > 0) {
    const response = await fetch("/api/stage-elements/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newElements),
    });

    return await response.json();
  }

  const modifiedExistingElements = formData.stage_elements
    .filter((currentElement) => {
      // Find the corresponding initial element
      const initialElement = originalPlotData.stage_elements.find(
        (initialElement) => initialElement.id === currentElement.id
      );

      // Check if the element has changed (x, y, or title)
      return (
        initialElement &&
        (currentElement.x !== initialElement.x ||
          currentElement.y !== initialElement.y ||
          currentElement.title !== initialElement.title)
      );
    })
    .filter((el) => typeof el.id === "number");

  if (modifiedExistingElements.length > 0) {
    const response = await fetch("/api/stage-elements/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedExistingElements),
    });

    return await response.json();
  }
  try {
    const results = await Promise.all(updatePromises);
    return results;
  } catch (error: any) {
    throw new Error(error.message || "Error updating stage plot");
  }
};
