import DraggableItem from "@/app/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ChooseInstrumentModal from "./ChooseInstrumentModal";
import { StagePlotFormData } from "@/types";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: [] }) => {
  const [draggingId, setDraggingId] = useState<string | number>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const itemSize = 40;

      const updatedElements = fields.map((element) => {
        console.log(element.id, "what is the element", active.id);
        if (element.id === active.id) {
          let newX = element.x + delta.x;
          let newY = element.y + delta.y;

          if (
            newX >= 0 &&
            newX + itemSize <= rect.width &&
            newY >= 0 &&
            newY + itemSize <= rect.height
          ) {
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
            const indexToRemove = fields.findIndex(
              (el) => el.id === element.id
            );

            remove(indexToRemove);
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
        height: "80vh",
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
        {stage_elements.map((stageElement, index) => (
          <DraggableItem
            key={stageElement.id}
            id={stageElement.id}
            x={stageElement.x}
            y={stageElement.y}
            title={stageElement.title}
            dragging={draggingId === stageElement.id}
          />
        ))}
      </DndContext>
    </div>
  );
};

export default StagePlotGraphicPrint;
