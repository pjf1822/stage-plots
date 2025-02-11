import { ITEM_SIZES } from "@/constants";
import Image from "next/image";
import React from "react";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: any }) => {
  console.log(stage_elements);
  return (
    <div
      style={{
        height: "90vh",
        width: "90vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      {stage_elements?.map((stageElement: any, index: any) => {
        const itemSize = ITEM_SIZES[stageElement.title] ?? 100;

        const zIndex = stageElement.title === "riser" ? 2 : 3;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: stageElement.y,
              left: stageElement.x,
              width: itemSize * stageElement?.scale,
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
                  color: "black", // You can customize the text color here
                  pointerEvents: "none", // Prevent interaction while dragging
                  width: "200px", // Adjust the width of the image
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
