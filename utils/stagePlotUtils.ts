import { toast } from "@/hooks/use-toast";

const isInTrashArea = (x: number, y: number, scale: number, rect: DOMRect) => {
  const trashCanRight = rect.width - 20;
  const trashCanBottom = rect.height - 20;
  const itemSize = 75 * scale; // Example for item size based on scale

  return (
    x >= trashCanRight - itemSize - 130 * scale && // Left boundary
    x <= trashCanRight + itemSize + 30 && // Right boundary
    y >= trashCanBottom - itemSize - 110 * scale && // Top boundary
    y <= trashCanBottom + itemSize + 30 // Bottom boundary
  );
};

export const onDragEnd = ({
  delta,
  activeId,
  stageElements,
  setStageElements,
  saveToHistory,
  containerRef,
}: any) => {
  const container = containerRef.current;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const updatedElement = stageElements.find(
    (element) => element.id === activeId
  );
  if (!updatedElement) return;

  const itemSize =
    updatedElement.title === "drum-kit" || updatedElement.title === "riser"
      ? 75 * updatedElement.scale
      : 35 * updatedElement.scale;
  let newX = updatedElement.x + delta.x;
  let newY = updatedElement.y + delta.y;

  // Check if element is dragged into the trash
  if (isInTrashArea(newX, newY, updatedElement.scale, rect)) {
    const indexToRemove = stageElements.findIndex(
      (el: any) => el.id === updatedElement.id
    );
    if (indexToRemove !== -1) {
      stageElements.splice(indexToRemove, 1);
      setStageElements([...stageElements]);
      saveToHistory("remove");
      toast({
        title: "Deleted item!",
      });
    }
  } else if (delta.x !== 0 || delta.y !== 0) {
    // If not in trash, update the element's position
    saveToHistory("move");
    setStageElements((prevElements) =>
      prevElements.map((element) =>
        element.id === activeId
          ? { ...updatedElement, x: newX, y: newY }
          : element
      )
    );
  }
};
export // Function to handle the rotation logic
const handleRotateStart = (
  e: React.MouseEvent,
  rotate: number,
  startAngleRef: any,
  startRotationRef: any,
  onRotateChange?: (newRotation: number) => void
) => {
  console.log("started to rotate");
  const element = e.currentTarget.parentElement;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Calculate the starting angle
  const startAngle =
    Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

  startAngleRef.current = startAngle;
  startRotationRef.current = rotate; // Use the current rotation prop value

  const handleRotateMove = (moveEvent: MouseEvent) => {
    const currentAngle =
      Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX) *
      (180 / Math.PI);

    // Calculate the difference and update rotation
    let deltaAngle = currentAngle - startAngleRef.current;

    // Normalize the rotation to keep it between 0 and 360
    let newRotation = (startRotationRef.current + deltaAngle) % 360;
    if (newRotation < 0) newRotation += 360;
    const snappedRotation = Math.round(newRotation / 3) * 3;

    onRotateChange?.(snappedRotation);
  };

  const handleRotateEnd = () => {
    document.removeEventListener("mousemove", handleRotateMove);
    document.removeEventListener("mouseup", handleRotateEnd);
  };

  document.addEventListener("mousemove", handleRotateMove);
  document.addEventListener("mouseup", handleRotateEnd);
};

export const handleMouseDown = (
  e: React.MouseEvent,
  scale: number,
  onScaleChange?: (newScale: number) => void
) => {
  console.log("handle mouse down");
  e.preventDefault();
  e.stopPropagation();

  const startX = e.clientX;
  const startY = e.clientY;

  const handleMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startX;
    const deltaY = moveEvent.clientY - startY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const scaleFactor = 0.01;

    const roundToDecimalPlaces = (value: any) => {
      return Math.round(value * Math.pow(10, 1)) / Math.pow(10, 1);
    };
    const newScale = Math.max(
      0.7,
      Math.min(
        1.8,
        roundToDecimalPlaces(scale + distance * Math.sign(deltaX) * scaleFactor)
      )
    );
    onScaleChange?.(newScale);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
