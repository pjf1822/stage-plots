import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "./use-toast";
import { HistoryState } from "@/app/components/StagePlotGraphic";

interface KeyPressProps {
  activeItemId: string;
  fields: any[];
  clipboardItem: any;
  setClipboardItem: Function;
  append: Function;
  update: Function;
  remove: Function;
  saveToHistory: Function;
  history: HistoryState[];
  historyIndex: any;
  setHistoryIndex: Function;
  containerRef: any;
}

const useStagePlotKeyPress = ({
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
}: KeyPressProps) => {
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
        }
      }

      // Paste (Ctrl/Cmd + V)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (clipboardItem) {
          const container = containerRef.current;
          if (container) {
            const newX = clipboardItem.x + 4;
            const newY = clipboardItem.y + 4;

            append({
              id: uuidv4(),
              label: clipboardItem.label,
              x: newX,
              y: newY,
              stage_plot_id: clipboardItem.stage_plot_id,
              title: clipboardItem.title,
              scale: clipboardItem.scale,
              rotate: clipboardItem.rotate,
            });
          }
        }
      }

      // Undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (historyIndex >= 0) {
          const previousState = history[historyIndex];
          // Restore previous state
          previousState.elements.forEach((element, idx) => {
            if (fields[idx]) {
              update(idx, element);
            }
          });
          // Remove any extra elements that might exist in current state
          if (fields.length > previousState.elements.length) {
            for (
              let i = fields.length - 1;
              i >= previousState.elements.length;
              i--
            ) {
              remove(i);
            }
          }
          setHistoryIndex(historyIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeItemId, fields, clipboardItem]);
};

export default useStagePlotKeyPress;
