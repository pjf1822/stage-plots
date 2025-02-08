import { ITEM_SIZES } from "@/constants";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { useRef, useState } from "react";

interface DraggableItemProps {
  id: string;
  x: number;
  y: number;
  title: string;
  dragging: boolean;
  label: string;
  scale: number;
  rotate: number;
  isActive: boolean; // New prop to determine if this item is the active one
  setActiveItemId: (id: string) => void; // Replace onActivate with setter
  onScaleChange?: (newScale: number) => void;
  onRotateChange?: (newRotation: number) => void; // New callback to update rotation
}
function DraggableItem({
  id,
  x,
  y,
  title,
  dragging,
  label,
  scale = 1,
  rotate = 0,
  isActive,
  setActiveItemId, // Use setter directly
  onScaleChange,
  onRotateChange,
}: DraggableItemProps) {
  const { listeners, setNodeRef, transform, attributes } = useDraggable({
    id: id,
  });

  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);

  // Function to handle the rotation logic
  const handleRotateStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const element = e.currentTarget.parentElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the starting angle
    const startAngle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    startAngleRef.current = startAngle;
    startRotationRef.current = rotate; // Use the current rotation prop value

    const handleRotateMove = (moveEvent: MouseEvent) => {
      const currentAngle =
        Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX) *
        (180 / Math.PI);

      // Calculate the difference and update rotation
      let deltaAngle = currentAngle - startAngleRef.current;

      // Normalize the rotation to keep it between 0 and 360
      let newRotation = (startRotationRef.current + deltaAngle) % 360;
      if (newRotation < 0) newRotation += 360;

      onRotateChange?.(newRotation); // Call the parent's onRotateChange function to update the rotation
    };

    const handleRotateEnd = () => {
      document.removeEventListener("mousemove", handleRotateMove);
      document.removeEventListener("mouseup", handleRotateEnd);
    };

    document.addEventListener("mousemove", handleRotateMove);
    document.addEventListener("mouseup", handleRotateEnd);
  };

  // Rest of your component remains the same...

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // if (isResizing) {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const scaleFactor = 0.01;

      const roundToDecimalPlaces = (value: any) => {
        return Math.round(value * Math.pow(10, 1)) / Math.pow(10, 1);
      };
      const newScale = Math.max(
        0.7,
        Math.min(
          2.2,
          roundToDecimalPlaces(
            scale + distance * Math.sign(deltaX) * scaleFactor
          )
        )
      );
      onScaleChange?.(newScale);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const itemSize = ITEM_SIZES[title] ?? 100;

  const zIndex = title === "riser" ? 2 : 3;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: itemSize * scale,
        height: itemSize * scale,
        transform: dragging
          ? `translate(${transform?.x || 0}px, ${
              transform?.y || 0
            }px) rotate(${rotate}deg)`
          : `rotate(${rotate}deg)`, // Apply rotation here
        zIndex: zIndex,
      }}
      onMouseDown={() => setActiveItemId(id)}
    >
      <div ref={setNodeRef} {...listeners} className="w-full h-full relative">
        {label ? (
          <span
            style={{
              fontFamily: "urbanist",
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "22px",
              color: "black", // You can customize the text color here
              pointerEvents: "none", // Prevent interaction while dragging
              width: "auto", // Adjust the width of the image
              height: "auto",
              textAlign: "center",
              padding: 10,
            }}
          >
            {label}
          </span>
        ) : (
          <Image
            src={`/${title}.svg`}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
          />
        )}
      </div>

      {!label && isActive && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize rounded-sm opacity-50 hover:opacity-100"
          onMouseDown={handleMouseDown}
          style={{
            touchAction: "none",
            pointerEvents: "auto",
            zIndex: 10,
          }}
        />
      )}
      {!label && isActive && (
        <div
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 cursor-pointer rounded-full opacity-50 hover:opacity-100"
          onMouseDown={handleRotateStart}
          style={{
            touchAction: "none",
            pointerEvents: "auto",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}

export default DraggableItem;
