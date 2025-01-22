import DraggableItem from "@/app/components/DraggableItem";
import { handleStageElements } from "@/services/stageElementsService";
import { StageElement } from "@/types";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const StagePlotGraphic = ({ stageElements, plotid }: any) => {
  console.log(stageElements);
  const [currentStageElements, setCurrentStageElements] =
    useState(stageElements);
  const [draggingId, setDraggingId] = useState<string | number>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPositionSet, setIsPositionSet] = useState(true);

  const addStageElement = () => {
    const newElement: StageElement = {
      id: uuidv4(),
      x: 50 * stageElements.length,
      y: 50,
      title: "guitar",
      stage_plot_id: plotid,
    };

    setCurrentStageElements((prevElements) => [...prevElements, newElement]);
  };

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40;

      setCurrentStageElements((prevElements) =>
        prevElements.map((stageElement) => {
          if (stageElement.id === active.id) {
            let newX = stageElement.x + delta.x;
            let newY = stageElement.y + delta.y;

            if (
              newX < 0 ||
              newX + itemSize > rect.width ||
              newY < 0 ||
              newY + itemSize > rect.height
            ) {
              return stageElement;
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
          currentStageElements?.map((stageElement) => (
            <DraggableItem
              key={stageElement.id}
              id={stageElement.id}
              x={stageElement.x}
              y={stageElement.y}
              dragging={draggingId === stageElement.id}
            />
          ))}
      </DndContext>
      <button
        onClick={addStageElement}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Add New Element
      </button>
      <button
        onClick={() => handleStageElements(stageElements, currentStageElements)}
        style={{ position: "absolute", bottom: 10, left: 10 }}
      >
        Update Elements
      </button>
    </div>
  );
};

export default StagePlotGraphic;
