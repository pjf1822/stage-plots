import DraggableItem from "@/app/components/DraggableItem";
import { handleStageElements } from "@/services/stageElementsService";
import { StageElement } from "@/types";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const StagePlotGraphic = ({ stagePlotId }: { stagePlotId: string }) => {
  const { control } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "stage_elements",
    keyName: "fuckingbullshitfield",
  });
  const [draggingId, setDraggingId] = useState<string | number>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const trashCanRef = useRef<HTMLDivElement>(null);

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
          const trashCanRight = rect.width - 50;
          const trashCanBottom = rect.height - 50;

          const isInTrash =
            newX >= trashCanRight - 50 &&
            newX <= trashCanRight + 50 &&
            newY >= trashCanBottom - 50 &&
            newY <= trashCanBottom + 50;

          if (isInTrash) {
            // Delete the element from the stage_elements array
            const indexToRemove = fields.findIndex(
              (el) => el.id === element.id
            );

            remove(indexToRemove);
          } else {
            console.log("not on top of the fucking trash");
          }

          return { ...element, x: newX, y: newY };
        }
        return element;
      });
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
      <div
        ref={trashCanRef}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#f0f0f0",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ccc",
          zIndex: "-1",
        }}
      >
        <Image
          src="/trash.svg"
          alt="trash"
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
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
