import Draggable from "@/components/Draggable";
import { Droppable } from "@/components/Droppable";
import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";
import { useState } from "react";

const StagePlotGraphic = () => {
  const [parent, setParent] = useState(null);
  const draggable = (
    <Draggable id="draggable">
      <Image
        src="/guitar.svg" // Path to the guitar SVG
        alt="Guitar"
        width={100} // Adjust the size of the SVG
        height={100}
      />
    </Draggable>
  );

  return (
    <div style={containerStyle}>
      <DndContext onDragEnd={handleDragEnd}>
        {!parent ? draggable : null}
        <Droppable id="droppable">
          <div
            style={
              parent === "droppable" ? droppableActiveStyle : droppableStyle
            }
          >
            {parent === "droppable" ? draggable : "Drop here"}
          </div>
        </Droppable>
      </DndContext>
    </div>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
};

export default StagePlotGraphic;

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  flexDirection: "column",
  backgroundColor: "#f4f4f4",
  padding: "20px",
};

const droppableStyle = {
  width: "80vw", // Set to 80% of the viewport width
  height: "70vh", // Set to 70% of the viewport height
  border: "4px dashed #3498db", // Nice dashed outline
  borderRadius: "12px", // Rounded corners
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  transition: "background-color 0.2s ease",
};

const droppableActiveStyle = {
  ...droppableStyle,
  backgroundColor: "#e8f4f8", // Light blue color when active
};
