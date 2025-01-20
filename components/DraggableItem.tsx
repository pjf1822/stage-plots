import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";

interface DraggableItemProps {
  x: number;
  y: number;
  dragging: boolean;
}
function DraggableItem({ x, y, dragging }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: 40,
        height: 40,
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`
          : "none",
      }}
    >
      <Image
        src="/guitar.svg" // Adjust the path based on your file location
        alt="Guitar"
        layout="fill" // Fill the parent container with the image
        objectFit="contain" // Maintain the aspect ratio of the SVG
      />
    </div>
  );
}

export default DraggableItem;
