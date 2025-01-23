import DraggableItem from "@/app/components/DraggableItem";
import { handleStageElements } from "@/services/stageElementsService";
import { StageElement } from "@/types";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const StagePlotGraphic = ({ stagePlotId }: { stagePlotId: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stage_elements",
  });
  const [draggingId, setDraggingId] = useState<string | number>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPositionSet, setIsPositionSet] = useState(true);

  const addStageElement = () => {
    const newElement: StageElement = {
      id: uuidv4(),
      x: 50 * fields.length,
      y: 50,
      title: "guitar",
      stage_plot_id: stagePlotId,
    };

    append(newElement);
  };

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40;

      const updatedElement = fields.find(
        (stageElement) => stageElement.id === active.id
      );

      // If the element exists and was found in the fields
      if (updatedElement) {
        let newX = updatedElement.x + delta.x;
        let newY = updatedElement.y + delta.y;

        if (
          newX < 0 ||
          newX + itemSize > rect.width ||
          newY < 0 ||
          newY + itemSize > rect.height
        ) {
          return;
        }
        const updatedStageElement = { ...updatedElement, x: newX, y: newY };

        const index = fields.findIndex((element) => element.id === active.id);
        if (index !== -1) {
          remove(index);
          append(updatedStageElement);
        }
      }
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
          fields?.map((stageElement, index) => (
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
        type="button"
        onClick={addStageElement}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Add New Element
      </button>
    </div>
  );
};

export default StagePlotGraphic;
