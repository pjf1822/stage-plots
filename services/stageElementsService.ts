import { StageElement } from "@/types";

export const handleStageElements = async (
  initialStageElements: any,
  stageElements: StageElement[]
) => {
  const newElements = stageElements.filter((el) => typeof el.id === "string");
  console.log(newElements, "show me this");
  const modifiedExistingElements = stageElements
    .filter((currentElement) => {
      // Find the corresponding initial element
      const initialElement = initialStageElements.find(
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
    .filter((el) => typeof el.id === "number"); // Keep only the
  try {
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
  } catch (error) {
    console.error("Error handling stage elements:", error);
    throw error;
  }
};
