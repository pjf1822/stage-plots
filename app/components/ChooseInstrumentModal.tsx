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
  const topPriorityItems = items.slice(0, 12); // Get first 10 items
  const secondaryItems = items.slice(12); // Get the rest of the items

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
          // maxWidth: "300px",
          minWidth: "200px",
        }}
      >
        <DialogHeader>
          <DialogTitle>Select an Item</DialogTitle>
        </DialogHeader>

        <div>
          {/* <h3 className="text-lg font-semibold mb-2">Common</h3> */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {topPriorityItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full"
                >
                  {formattedItem}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Secondary Items */}
        <div>
          {/* <h3 className="text-lg font-semibold mb-2">Other Options</h3> */}
          <div className="grid grid-cols-4 gap-4">
            {secondaryItems.map((item, index) => {
              const formattedItem = item.replace(/-/g, " ");
              return (
                <Button
                  key={index}
                  onClick={() => onSelect(item)}
                  className="w-full text-gray-600 bg-gray-200 hover:bg-gray-300"
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
