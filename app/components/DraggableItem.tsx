import { ITEM_SIZES } from "@/constants";
import { handleMouseDown, handleRotateStart } from "@/utils/stagePlotUtils";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { useRef } from "react";

interface DraggableItemProps {
  id: string;
  x: number;
  y: number;
  title: string;
  label: string;
  scale: number;
  rotate: number;
  isActive: boolean;
  setActiveItemId: (id: string) => void;
  onScaleChange: any;
  onRotateChange: any;
  containerWidth: number;
}

function DraggableItem({
  id,
  x,
  y,
  title,
  label,
  scale = 1,
  rotate = 0,
  isActive,
  setActiveItemId,
  onScaleChange,
  onRotateChange,
  containerWidth,
}: DraggableItemProps) {
  const { listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);
  const itemSize = ITEM_SIZES[title] ?? 100;

  const zIndex = title === "riser" || title === "basic-riser" ? 2 : 3;

  return (
    <div
      style={{
        position: "absolute",
        top: (750 * y) / 100,
        left: (containerWidth * x) / 100,
        width: itemSize * scale,
        height: itemSize * scale,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${rotate}deg)`
          : `rotate(${rotate}deg)`,
        transformOrigin: "center",

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
              color: "black",
              pointerEvents: "none",
              width: "auto",
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
          onMouseDown={(e) => handleMouseDown(e, scale, onScaleChange)}
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
          onMouseDown={(e) =>
            handleRotateStart(
              e,
              rotate,
              startAngleRef,
              startRotationRef,
              onRotateChange
            )
          }
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
