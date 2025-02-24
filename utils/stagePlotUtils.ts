import { toast } from "@/hooks/use-toast";

export const onDragEnd = ({
  delta,
  active,
  fields,
  update,
  remove,
  saveToHistory,
  containerRef,
}: any) => {
  const container = containerRef.current;
  if (container) {
    const rect = container.getBoundingClientRect();

    const updatedElements = fields.map((element: any) => {
      const itemSize =
        element.title === "drum-kit" || element.title === "riser"
          ? 75 * element.scale
          : 35 * element.scale;
      if (element.id === active.id) {
        let newX = element.x + delta.x;
        let newY = element.y + delta.y;
        if (
          newX >= -120 &&
          newX + itemSize <= rect.width - 10 &&
          newY >= -120 &&
          newY + itemSize <= rect.height - 10
        ) {
          update(
            fields.findIndex((el: any) => el.id === element.id),
            {
              ...element,
              x: newX,
              y: newY,
            }
          );
        }

        const trashCanRight = rect.width - 20;
        const trashCanBottom = rect.height - 20;

        const isInTrash =
          newX >= trashCanRight - itemSize - 130 * element.scale && //left boundary
          newX <= trashCanRight + itemSize + 30 && //right boundary
          newY >= trashCanBottom - itemSize - 110 * element.scale && // top boundary
          newY <= trashCanBottom + itemSize + 30; // boundary

        if (isInTrash) {
          const indexToRemove = fields.findIndex(
            (el: any) => el.id === element.id
          );
          remove(indexToRemove);
          saveToHistory("remove");
          toast({
            title: "Deleted item!",
          });
        } else if (!isInTrash && (delta.x !== 0 || delta.y !== 0)) {
          saveToHistory("move");
        }
        return { ...element, x: newX, y: newY };
      }
      return element;
    });
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
