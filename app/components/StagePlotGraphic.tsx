import DraggableItem from "@/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useState } from "react";

const StagePlotGraphic = () => {
  const [{ x, y }, setCoordinates] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  return (
    <div style={{ height: "50vh", width: "50vw", backgroundColor: "red" }}>
      <DndContext
        onDragStart={() => {
          setDragging(true);
        }}
        onDragEnd={({ delta }) => {
          setCoordinates(({ x, y }) => ({
            x: x + delta.x,
            y: y + delta.y,
          }));
        }}
      >
        <DraggableItem x={x} y={y} dragging={dragging} />
      </DndContext>
    </div>
  );
};

export default StagePlotGraphic;
