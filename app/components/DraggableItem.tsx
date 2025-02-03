import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";

interface DraggableItemProps {
  id: string;
  x: number;
  y: number;
  title: string;
  dragging: boolean;
  scale: number;
  onScaleChange?: (newScale: number) => void;
}
function DraggableItem({
  id,
  x,
  y,
  title,
  dragging,
  scale = 1,
  onScaleChange,
}: DraggableItemProps) {
  const { listeners, setNodeRef, transform, attributes } = useDraggable({
    id: id,
  });

  const imageSrc = `/${title.toLowerCase()}.${
    title === "Mic-stand" ? "jpg" : "svg"
  }`;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startScale = scale;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // if (isResizing) {
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
          2,
          roundToDecimalPlaces(
            scale + distance * Math.sign(deltaX) * scaleFactor
          )
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

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: 80 * scale,
        height: 80 * scale,
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`
          : "none",
      }}
    >
      {/* Draggable area */}
      <div ref={setNodeRef} {...listeners} className="w-full h-full relative">
        <Image
          src={imageSrc}
          alt={title}
          style={{
            objectFit: "contain",
            transform: title === "Monitor" ? "rotate(270deg)" : "rotate(0deg)",
          }}
          fill
        />
      </div>

      {/* Resize handle - outside the draggable area */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize rounded-sm opacity-50 hover:opacity-100"
        onMouseDown={handleMouseDown}
        style={{
          touchAction: "none",
          pointerEvents: "auto",
          zIndex: 10,
        }}
      />
    </div>
  );
}

export default DraggableItem;
