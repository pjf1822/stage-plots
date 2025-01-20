import { useDraggable } from "@dnd-kit/core";
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
        backgroundColor: "blue",
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`
          : "none",
      }}
    />
  );
}

export default DraggableItem;
