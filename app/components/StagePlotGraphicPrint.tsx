import { ITEM_SIZES } from "@/constants";
import Image from "next/image";

const StagePlotGraphicPrint = ({ stage_elements }: { stage_elements: any }) => {
  return (
    <div
      style={{
        height: 750,
        width: 1500,
        position: "relative",
        border: "2px solid black",
        margin: "0 auto",
      }}
    >
      {stage_elements?.map((stageElement: any, index: any) => {
        const itemSize = ITEM_SIZES[stageElement.title] ?? 100;

        const zIndex = stageElement.title === "riser" ? 1 : 3;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: stageElement.y,
              left: stageElement.x,
              width: itemSize * stageElement?.scale,
              height: itemSize * stageElement?.scale,
              transform: `rotate(${stageElement.rotate}deg)`,

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
                src={`/${stageElement.title}.svg`}
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
