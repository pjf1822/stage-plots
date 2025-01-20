import DraggableItem from "@/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const StagePlotGraphic = () => {
  const [{ x, y }, setCoordinates] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPositionSet, setIsPositionSet] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setCoordinates({ x: rect.left, y: rect.top });
      setIsPositionSet(true);
    }
  }, []);

  const onDragEnd = ({ delta }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40; // Size of the draggable item

      // Calculate new position
      let newX = x + delta.x;
      let newY = y + delta.y;

      if (
        newX < 0 ||
        newX + itemSize > rect.width ||
        newY < 0 ||
        newY + itemSize > rect.height
      ) {
        console.log("Dragged item out of bounds");
        return; // Prevent updating the position if out of bounds
      }

      setCoordinates({ x: newX, y: newY });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "60vh",
        width: "70vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      <DndContext
        onDragStart={() => {
          setDragging(true);
        }}
        onDragEnd={onDragEnd}
      >
        {isPositionSet && <DraggableItem x={x} y={y} dragging={dragging} />}
      </DndContext>
    </div>
  );
};

export default StagePlotGraphic;
