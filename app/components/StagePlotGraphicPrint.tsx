import Image from "next/image";
import React from "react";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: any }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "90vw",
        position: "relative",
        border: "2px solid black",
        justifySelf: "center",
      }}
    >
      {stage_elements?.map((stageElement: any, index: any) => {
        let itemSize: number;
        switch (stageElement.title) {
          case "riser":
            itemSize = 260; // larger size for riser
            break;
          case "vocal":
            itemSize = 180; // slightly larger size for vocal
            break;
          case "guitar":
            itemSize = 100; // medium size for guitar
            break;
          case "drum-kit":
            itemSize = 300; // medium size for guitar
            break;
          case "bass-cab":
            itemSize = 100; // medium size for guitar
            break;
          case "pedal":
            itemSize = 50; // medium size for guitar
            break;
          case "di":
            itemSize = 50; // medium size for guitar
            break;
          case "power":
            itemSize = 70; // medium size for guitar
            break;
          case "monitor":
            itemSize = 180; // medium size for guitar
            break;
          case "keys":
            itemSize = 100; // medium size for guitar
            break;
          case "man":
            itemSize = 120; // medium size for guitar
            break;
          case "woman":
            itemSize = 120; // medium size for guitar
            break;
          case "grand-piano":
            itemSize = 220; // medium size for guitar
            break;
          case "cello":
            itemSize = 190; // medium size for guitar
            break;
          case "podium":
            itemSize = 190; // medium size for guitar
            break;
          case "accordian":
            itemSize = 190; // medium size for guitar
            break;
          case "djembe":
            itemSize = 120; // medium size for guitar
            break;
          case "bagpipes":
            itemSize = 120; // medium size for guitar
            break;
          default:
            itemSize = 100; // default size
        }

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
