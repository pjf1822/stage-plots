import React from "react";

type ModalProps = {
  isOpen: boolean;
  items: string[];
  onSelect: (item: string) => void;
  onClose: () => void;
};
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ChooseInstrumentModal = ({
  isOpen,
  items,
  onSelect,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null;
  const topPriorityItems = [
    "vocal",
    "guitar",
    "drum-kit",
    "spd",
    "bass-cab",
    "man",
    "woman",
    "electric-guitar",
    "bass",
    "riser",
    "pedal",
  ];
  const audioItems = ["di", "monitor", "power"]; // Specific audio items
  const otherItems = items.filter(
    (item) => !topPriorityItems.includes(item) && !audioItems.includes(item)
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <button style={{ display: "none" }}></button>
      </DialogTrigger>
      <DialogContent
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          minWidth: "800px",
          maxHeight: "80vh", // Set max height for the modal
          overflowY: "auto", // Make it scrollable
        }}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div>
          <h3 className="text-lg font-semibold mb-2">Common</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {topPriorityItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full"
                  style={{ textTransform: "uppercase" }}
                >
                  {formattedItem}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Audio Items Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Audio</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {audioItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full"
                  style={{ textTransform: "uppercase" }}
                >
                  {formattedItem}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Other Items Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Other Options</h3>
          <div className="grid grid-cols-4 gap-4">
            {otherItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full text-gray-600 bg-gray-200 hover:bg-gray-300"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {formattedItem}
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseInstrumentModal;
