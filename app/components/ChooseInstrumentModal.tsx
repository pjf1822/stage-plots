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
          <DialogDescription>
            Choose an instrument from the list below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          {items.map((item, index) => {
            // Replace dash with space
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
      </DialogContent>
    </Dialog>
  );
};

export default ChooseInstrumentModal;
