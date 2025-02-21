import { ITEM_SIZES } from "@/constants";
import Image from "next/image";
import React from "react";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: any }) => {
  return (
    <div
      style={{
        height: 900,
        width: "89vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      {stage_elements?.map((stageElement: any, index: any) => {
        const itemSize = ITEM_SIZES[stageElement.title] ?? 100;

        const scaleFactor = 9 / 7;
        const zIndex = stageElement.title === "riser" ? 1 : 3;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top:
                stageElement.y < 0
                  ? stageElement.y
                  : stageElement.y * scaleFactor + 28, // Apply scaling only if y is not negative
              left: stageElement.x,
              width: itemSize * stageElement?.scale, // Scale the width of the item
              height: itemSize * stageElement?.scale,
              transform: `rotate(${stageElement.rotate}deg)`, // Corrected line

              zIndex: zIndex,
            }}
          >
            {stageElement.label ? (
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
                  height: "auto",
                }}
              >
                {stageElement.label}
              </span>
            ) : (
              <Image
                src={
                  `/${stageElement.title}.svg` // SVG for other items
                }
                alt={stageElement.title}
                style={{
                  objectFit: "contain",
                }}
                fill
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StagePlotGraphicPrint;
