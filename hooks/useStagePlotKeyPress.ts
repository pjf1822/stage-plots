import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "./use-toast";
import { HistoryState } from "@/app/components/StagePlotGraphic";

interface KeyPressProps {
  activeItemId: string;
  stageElements: any;
  setStageElements: any;
  clipboardItem: any;
  setClipboardItem: Function;
  saveToHistory: Function;
  history: HistoryState[];
  historyIndex: any;
  setHistoryIndex: Function;
  containerRef: any;
}

const useStagePlotKeyPress = ({
  activeItemId,
  stageElements,
  setStageElements,
  clipboardItem,
  setClipboardItem,
  saveToHistory,
  history,
  historyIndex,
  setHistoryIndex,
  containerRef,
}: KeyPressProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!activeItemId) return;

      // Copy (Ctrl/Cmd + C)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const itemToCopy = stageElements.find(
          (element) => element.id === activeItemId
        );
        if (itemToCopy) {
          setClipboardItem(itemToCopy);
        }
      }

      // Paste (Ctrl/Cmd + V)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (clipboardItem) {
          const container = containerRef.current;
          if (container) {
            const newX = clipboardItem.x + 40;
            const newY = clipboardItem.y + 20;

            const newElement = {
              id: uuidv4(),
              label: clipboardItem.label,
              x: newX,
              y: newY,
              stage_plot_id: clipboardItem.stage_plot_id,
              title: clipboardItem.title,
              scale: clipboardItem.scale,
              rotate: clipboardItem.rotate,
            };

            setStageElements((prevElements) => [...prevElements, newElement]);
            // saveToHistory("add"); // Save the "add" action to history
          }
        }
      }
      // Undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (historyIndex >= 0) {
          const previousState = history[historyIndex];
          setStageElements(previousState.elements); // Reset to previous state
          setHistoryIndex(historyIndex - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeItemId, clipboardItem, stageElements, history, historyIndex]);
};

export default useStagePlotKeyPress;
