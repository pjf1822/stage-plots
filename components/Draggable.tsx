import React from "react";
import { useDraggable } from "@dnd-kit/core"; // Make sure this import is correct
import { CSS } from "@dnd-kit/utilities"; // Make sure this import is correct

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform, over, isDragging } =
    useDraggable({
      id: props.id,
    });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

export default Draggable;
