import React from "react";

type ModalProps = {
  isOpen: boolean;
  items: string[];
  onSelect: (item: string) => void;
  onClose: () => void;
};

const ChooseInstrumentModal = ({
  isOpen,
  items,
  onSelect,
  onClose,
}: ModalProps) => {
  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
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
        <h3>Select an Item</h3>
        {items.map((item, index) => (
          <button
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
            }}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
        <button
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChooseInstrumentModal;
