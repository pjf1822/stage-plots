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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ChooseInstrumentModal = ({
  isOpen,
  items,
  onSelect,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null;
  const topPriorityItems = [
    "vocal-with-stand",
    "wired-vocal",
    "wireless-vocal",
    "drum-kit",
    "spd",
    "bass-cab",
    "man",
    "woman",
    "bass",
    "riser",
    "basic-riser",
    "power",
  ];
  const audioItems = ["di", "wedge", "shotgun-mic"];
  const guitarItems = [
    "Electric-Guitar",
    "acoustic-guitar",
    "guitar-cabinet",
    "guitar-stand",
    "pedal",
    "amp-head",
  ];
  const otherItems = items.filter(
    (item) =>
      !topPriorityItems.includes(item) &&
      !audioItems.includes(item) &&
      !guitarItems.includes(item)
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
                  className="w-full py-8 flex flex-col items-center justify-center gap-2 h-32"
                  style={{ textTransform: "uppercase" }}
                >
                  {formattedItem}
                  <Image
                    src={`/${item}.svg`}
                    alt={item}
                    height={64}
                    width={64}
                    className="bg-transparent rounded-lg filter invert"
                  />
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
                  className="w-full py-8 flex flex-col items-center justify-center gap-2 h-32"
                  style={{ textTransform: "uppercase" }}
                >
                  {formattedItem}
                  <Image
                    src={`/${item}.svg`}
                    alt={item}
                    height={64}
                    width={64}
                    className="bg-transparent rounded-lg filter invert"
                  />
                </Button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Guitar</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {guitarItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full py-8 flex flex-col items-center justify-center gap-2 h-32"
                  style={{ textTransform: "uppercase" }}
                >
                  {formattedItem}
                  <Image
                    src={`/${item}.svg`}
                    alt={item}
                    height={64}
                    width={64}
                    className="bg-transparent rounded-lg filter invert"
                  />
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
                  className="w-full py-8 flex flex-col items-center justify-center gap-2 h-32"
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {formattedItem}
                  <Image
                    src={`/${item}.svg`}
                    alt={item}
                    height={64}
                    width={64}
                    className="bg-transparent rounded-lg filter invert"
                  />
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
