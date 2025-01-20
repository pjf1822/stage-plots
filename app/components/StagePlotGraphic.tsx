import DraggableItem from "@/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

interface StageElementPosition {
  id: string;
  x: number;
  y: number;
}
const StagePlotGraphic = () => {
  const [stageElements, setStageElements] = useState<StageElementPosition[]>([
    { id: "1", x: 0, y: 0 },
    { id: "2", x: 50, y: 0 },
    { id: "3", x: 100, y: 0 },
  ]);
  const [draggingId, setDraggingId] = useState<string | number>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPositionSet, setIsPositionSet] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setStageElements(
        stageElements.map((stageElement, index) => ({
          ...stageElement,
          x: rect.left + index * 50,
          y: rect.top,
        }))
      );
      setIsPositionSet(true);
    }
  }, []);

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40;

      setStageElements((prevElements) =>
        prevElements.map((stageElement) => {
          if (stageElement.id === active.id) {
            // Calculate new position for the dragged guitar
            let newX = stageElement.x + delta.x;
            let newY = stageElement.y + delta.y;

            // Boundary checks
            if (
              newX < 0 ||
              newX + itemSize > rect.width ||
              newY < 0 ||
              newY + itemSize > rect.height
            ) {
              return stageElement; // Keep original position if out of bounds
            }

            return { ...stageElement, x: newX, y: newY };
          }
          return stageElement;
        })
      );
    }
    setDraggingId("");
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
        onDragStart={({ active }) => {
          setDraggingId(active?.id);
        }}
        onDragEnd={onDragEnd}
      >
        {isPositionSet &&
          stageElements.map((stageElement) => (
            <DraggableItem
              key={stageElement.id}
              id={stageElement.id}
              x={stageElement.x}
              y={stageElement.y}
              dragging={draggingId === stageElement.id}
            />
          ))}
      </DndContext>
    </div>
  );
};

export default StagePlotGraphic;
