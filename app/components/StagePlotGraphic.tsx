import DraggableItem from "@/app/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import React, { useEffect } from "react";
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
  const [activeItemId, setActiveItemId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clipboardItem, setClipboardItem] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trashCanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!activeItemId) return;

      // Copy (Ctrl/Cmd + C)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const itemToCopy = fields.find(
          (element) => element.id === activeItemId
        );
        if (itemToCopy) {
          setClipboardItem(itemToCopy);
          toast({
            title: "Copied item to clipboard",
          });
        }
      }

      // Paste (Ctrl/Cmd + V)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (clipboardItem) {
          const container = containerRef.current;
          if (container) {
            // Add slight offset to pasted item position
            const newX = clipboardItem.x + 20;
            const newY = clipboardItem.y + 20;

            append({
              ...clipboardItem,
              id: uuidv4(),
              x: newX,
              y: newY,
              stage_plot_id: stagePlotId,
              scale: 1.0,
              label: "",
              rotate: 0,
            });

            toast({
              title: "Pasted item",
            });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeItemId, fields, clipboardItem, stagePlotId]);

  const onDragEnd = ({ delta, active }: any) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();

      const updatedElements = fields.map((element) => {
        const itemSize =
          element.title === "drum-kit" || element.title === "riser"
            ? 120 * element.scale
            : 35 * element.scale;
        if (element.id === active.id) {
          let newX = element.x + delta.x;
          let newY = element.y + delta.y;
          if (
            newX >= -120 &&
            newX + itemSize <= rect.width - 10 &&
            newY >= -120 &&
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

          const trashCanRight = rect.width - 20;
          const trashCanBottom = rect.height - 20;
          console.log(
            itemSize,
            newX >= trashCanRight - itemSize - 130,
            newX <= trashCanRight + itemSize + 30
          );
          const isInTrash =
            newX >= trashCanRight - itemSize - 130 && //left boundary
            newX <= trashCanRight + itemSize + 30 && //right boundary
            newY >= trashCanBottom - itemSize - 110 && // top boundary
            newY <= trashCanBottom + itemSize + 30; // boundary

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
      rotate: 0,
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
  const handleRotateChange = (elementId: string, newRotation: number) => {
    const elementIndex = fields.findIndex((el) => el.id === elementId);
    if (elementIndex !== -1) {
      update(elementIndex, {
        ...fields[elementIndex],
        rotate: newRotation,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: 700,
        width: "89vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      <DndContext onDragEnd={onDragEnd}>
        {fields.map((stageElement, index) => (
          <DraggableItem
            key={stageElement.id}
            id={stageElement.id}
            x={stageElement.x}
            y={stageElement.y}
            title={stageElement.title}
            label={stageElement.label}
            scale={stageElement.scale}
            rotate={stageElement.rotate}
            isActive={activeItemId === stageElement.id} // Pass active state
            setActiveItemId={setActiveItemId} // Pass the setter directly
            onScaleChange={(newScale) =>
              handleScaleChange(stageElement.id, newScale)
            }
            onRotateChange={(newRotation) =>
              handleRotateChange(stageElement.id, newRotation)
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
          backgroundColor: "#E0E0E0",
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
        className="absolute top-2 left-2 font-urbanist"
      >
        Add New Element
      </Button>
      <AddText stagePlotId={stagePlotId} append={append} />

      <ChooseInstrumentModal
        isOpen={isModalOpen}
        items={[
          "vocal-with-stand",
          "wired-vocal",
          "acoustic-guitar",
          "drum-kit",
          "wedge",
          "power",
          "spd",
          "wireless-vocal",
          "Electric-Guitar",
          "bass",
          "man",
          "woman",
          "basic-riser",
          "keys",
          "bass-cab",
          // "drumsub",
          "riser",
          // "audio-console",
          "stool",
          "flute",
          "violin",
          "guitar-cabinet",
          "trumpet",
          "sax",
          "snare",
          "tambourine",
          "harp",
          "guitar-stand",
          "pedal",
          "grand-piano",
          "panpipe",
          "di",
          "cello",
          "clarinet",
          "congas",
          "french-horn",
          "shotgun-mic",
          "djembe",
          "square",
          "banjo",
          "bagpipes",
          "accordian",
          "harmonica",
          "oboe",
          "podium",
          "amp-head",
        ]}
        onSelect={handleItemSelect}
        onClose={closeModal}
      />
    </div>
  );
};

export default StagePlotGraphic;
