import DraggableItem from "@/app/components/DraggableItem";
import { handleStageElements } from "@/services/stageElementsService";
import { StageElement } from "@/types";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const StagePlotGraphic = ({ stagePlotId }: { stagePlotId: string }) => {
  const { control, setValue } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "stage_elements",
    keyName: "fieldId",
  });
  const [draggingId, setDraggingId] = useState<string | number>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40;

      const updatedElements = fields.map((element) => {
        if (element.id === active.id) {
          let newX = element.x + delta.x;
          let newY = element.y + delta.y;

          // Ensure element stays within bounds
          if (
            newX >= 0 &&
            newX + itemSize <= rect.width &&
            newY >= 0 &&
            newY + itemSize <= rect.height
          ) {
            // Update position in the form state
            update(
              fields.findIndex((el) => el.id === element.id),
              {
                ...element,
                x: newX,
                y: newY,
              }
            );
          }

          return { ...element, x: newX, y: newY };
        }
        return element;
      });

      setValue("stage_elements", updatedElements); // Update the entire field array
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
        {fields.map((stageElement, index) => (
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
        onClick={() =>
          append({
            id: uuidv4(),
            x: 50 * fields.length,
            y: 50,
            title: "New Element",
            stage_plot_id: stagePlotId,
          })
        }
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Add New Element
      </button>
    </div>
  );
};

export default StagePlotGraphic;
