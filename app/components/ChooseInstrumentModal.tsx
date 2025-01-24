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
  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {" "}
      {/* Bind modal open state to isOpen and onClose */}
      <DialogTrigger asChild>
        {/* Trigger to open the modal, you can replace with a button or any other component */}
        <button style={{ display: "none" }}></button>
      </DialogTrigger>
      <DialogContent
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          minWidth: "200px",
        }}
      >
        <DialogHeader>
          <DialogTitle>Select an Item</DialogTitle>
          <DialogDescription>
            Choose an instrument from the list below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <Button
              key={index}
              onClick={() => onSelect(item)}
              className="w-full"
            >
              {item}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseInstrumentModal;
