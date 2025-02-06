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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import AddText from "./AddText";

const StagePlotGraphic = ({ stagePlotId }: { stagePlotId: string }) => {
  const { control } = useFormContext<StagePlotFormData>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "stage_elements",
    keyName: "....",
  });
  const [draggingId, setDraggingId] = useState<string | number>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trashCanRef = useRef<HTMLDivElement>(null);

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();

      const updatedElements = fields.map((element) => {
        const itemSize = 35 * element.scale;
        if (element.id === active.id) {
          let newX = element.x + delta.x;
          let newY = element.y + delta.y;

          if (
            newX >= -20 &&
            newX + itemSize <= rect.width - 10 &&
            newY >= -20 &&
            newY + itemSize <= rect.height - 10
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
            newX >= trashCanRight - itemSize - 30 &&
            newX <= trashCanRight + itemSize + 30 &&
            newY >= trashCanBottom - itemSize - 30 &&
            newY <= trashCanBottom + itemSize + 30;

          if (isInTrash) {
            const indexToRemove = fields.findIndex(
              (el) => el.id === element.id
            );

            toast({
              title: "Deleted item!",
            });
            remove(indexToRemove);
          }

          return { ...element, x: newX, y: newY };
        }
        return element;
      });
    }
    setDraggingId("");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleItemSelect = (item: string) => {
    append({
      id: uuidv4(),
      x: 50,
      y: 50,
      title: item,
      stage_plot_id: stagePlotId,
      scale: 1.0,
      label: "",
    });
    closeModal();
  };

  const handleScaleChange = (elementId: string, newScale: number) => {
    const elementIndex = fields.findIndex((el) => el.id === elementId);
    if (elementIndex !== -1) {
      update(elementIndex, {
        ...fields[elementIndex],
        scale: newScale,
      });
    }
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
        {fields.map((stageElement, index) => (
          <DraggableItem
            key={stageElement.id}
            id={stageElement.id}
            x={stageElement.x}
            y={stageElement.y}
            title={stageElement.title}
            dragging={draggingId === stageElement.id}
            label={stageElement.label}
            scale={stageElement.scale}
            onScaleChange={(newScale) =>
              handleScaleChange(stageElement.id, newScale)
            }
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
        }}
      >
        <Image
          src="/trash.svg"
          alt="trash"
          style={{ objectFit: "contain" }}
          fill
        />
      </div>
      <Button
        type="button"
        onClick={openModal}
        className="absolute top-2 left-2"
      >
        Add New Element
      </Button>
      <AddText stagePlotId={stagePlotId} append={append} />

      <ChooseInstrumentModal
        isOpen={isModalOpen}
        items={[
          "vocal",
          "guitar",
          "drum-kit",
          "monitor",
          "power",
          "spd",
          "electric-guitar",
          "bass",
          "man",
          "woman",
          "keys",
          "bass-cab",
          "riser",
          "audio-console",
          "flute",
          "violin",
          "trumpet",
          "sax",
          "snare",
          "tambourine",
          "harp",
          "grand-piano",
          "panpipe",
          "di",
          "cello",
          "clarinet",
          "congas",
          "french-horn",
          "djembe",
          "banjo",
          "guitar-cabinet",
          "bagpipes",
          "accordian",
          "harmonica",
          "oboe",
          "podium",
        ]}
        onSelect={handleItemSelect}
        onClose={closeModal}
      />
    </div>
  );
};

export default StagePlotGraphic;
