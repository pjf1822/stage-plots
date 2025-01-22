import { StageElement } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";

interface DraggableItemProps {
  id: string | number;
  x: number;
  y: number;
  dragging: boolean;
}
function DraggableItem({ id, x, y, dragging }: DraggableItemProps) {
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
        src="/guitar.svg"
        alt="Guitar"
        style={{ objectFit: "contain" }}
        fill
      />
    </div>
  );
}

export default DraggableItem;
