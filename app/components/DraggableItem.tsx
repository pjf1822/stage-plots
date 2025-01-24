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
  const { listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const imageSrc = title === "Mic-stand" ? `/${title}.jpg` : `/${title}.svg`;
  console.log(imageSrc);
  return (
    <div
      ref={setNodeRef}
      // {...attributes}
      {...listeners}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: 50,
        height: 50,
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`
          : "none",
      }}
    >
      <Image
        src={imageSrc} // Use the dynamically set src
        alt={title}
        style={{
          objectFit: "contain",
          transform: title === "Monitor" ? "rotate(270deg)" : "rotate(0deg)",
        }}
        fill
      />
    </div>
  );
}

export default DraggableItem;
