import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";

interface DraggableItemProps {
  id: string;
  x: number;
  y: number;
  dragging: boolean;
  title: string;
}
function DraggableItem({ id, x, y, dragging, title }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
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
        src={`/${title}.svg`} // Use backticks for template literals to dynamically set the src
        alt={title}
        style={{ objectFit: "contain" }}
        fill
      />
    </div>
  );
}

export default DraggableItem;
