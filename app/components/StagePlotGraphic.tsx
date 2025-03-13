import DraggableItem from "@/app/components/DraggableItem";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ChooseInstrumentModal from "./ChooseInstrumentModal";
import { StagePlotFormData } from "@/types";
import { Button } from "@/components/ui/button";
import AddText from "./AddText";
import useStagePlotKeyPress from "@/hooks/useStagePlotKeyPress";
import { onDragEnd } from "@/utils/stagePlotUtils";

export interface HistoryState {
  elements: any[];
  action: "move" | "add" | "remove" | "scale" | "rotate";
}
const StagePlotGraphic = ({
  stagePlotId,
  containerWidth,
}: {
  stagePlotId: string;
  containerWidth: number;
}) => {
  const { control } = useFormContext<StagePlotFormData>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "stage_elements",
    keyName: "....",
  });

  const [activeItemId, setActiveItemId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clipboardItem, setClipboardItem] = useState<any>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = (action: HistoryState["action"]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      elements: JSON.parse(JSON.stringify(fields)),
      action,
    });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const trashCanRef = useRef<HTMLDivElement>(null);

  useStagePlotKeyPress({
    activeItemId,
    fields,
    append,
    update,
    remove,
    clipboardItem,
    setClipboardItem,
    saveToHistory,
    history,
    historyIndex,
    setHistoryIndex,
    containerRef,
  });
  const onDragEndHandler = (event: any) => {
    onDragEnd({
      delta: event.delta,
      active: event.active,
      fields: fields,
      update: update,
      remove: remove,
      saveToHistory: saveToHistory,
      containerRef: containerRef,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleItemSelect = (item: string) => {
    append({
      id: uuidv4(),
      x: 14,
      y: 14,
      title: item,
      stage_plot_id: stagePlotId,
      scale: 1.0,
      label: "",
      rotate: 0,
    });

    saveToHistory("add");
    closeModal();
  };

  const handleChange = (
    elementId: string,
    property: "scale" | "rotate",
    newValue: number
  ) => {
    const elementIndex = fields.findIndex((el) => el.id === elementId);

    if (elementIndex !== -1) {
      update(elementIndex, {
        ...fields[elementIndex],
        [property]: newValue,
      });
      saveToHistory(property);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: 750,
        width: "89vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: "2px",
          height: 40,
          backgroundColor: "black",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className="ignore-me"
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "2px",
          height: 40,
          backgroundColor: "black",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        className="ignore-me"
      />
      <DndContext onDragEnd={onDragEndHandler}>
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
            isActive={activeItemId === stageElement.id}
            setActiveItemId={setActiveItemId}
            onScaleChange={(newScale: any) =>
              handleChange(stageElement.id, "scale", newScale)
            }
            onRotateChange={(newRotation: any) =>
              handleChange(stageElement.id, "rotate", newRotation)
            }
            containerWidth={containerWidth}
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
        className="ignore-me"
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
        className="absolute top-2 left-2 font-urbanist ignore-me"
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
          "audio-console",
          "stool",
          "flute",
          "violin",
          "guitar-cabinet",
          "trumpet",
          "sax",
          "snare",
          "tambourine",
          // "harp",
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
          "chair",
        ]}
        onSelect={handleItemSelect}
        onClose={closeModal}
      />
    </div>
  );
};

export default StagePlotGraphic;
