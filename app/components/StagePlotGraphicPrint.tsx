import Image from "next/image";
import React from "react";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: any }) => {
  return (
    <div
      style={{
        height: "80vh",
        width: "70vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      {stage_elements?.map((stageElement: any, index: any) => {
        const imageSrc = `/${stageElement.title.toLowerCase()}.${
          stageElement.title === "Mic-stand" ? "jpg" : "svg"
        }`;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: stageElement.y,
              left: stageElement.x,
              width: 60,
              height: 60,
            }}
          >
            <Image
              src={imageSrc}
              alt={stageElement.title}
              style={{
                objectFit: "contain",
                transform:
                  stageElement.title === "Monitor"
                    ? "rotate(270deg)"
                    : "rotate(0deg)",
              }}
              fill
            />
          </div>
        );
      })}
    </div>
  );
};

export default StagePlotGraphicPrint;
