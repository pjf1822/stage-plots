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
  const { listeners, setNodeRef, transform, attributes } = useDraggable({
    id: id,
  });

  const imageSrc = `/${title.toLowerCase()}.${
    title === "Mic-stand" ? "jpg" : "svg"
  }`;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: 60,
        height: 60,
        zIndex: 23,
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`
          : "none",
      }}
    >
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
  );
}

export default DraggableItem;
