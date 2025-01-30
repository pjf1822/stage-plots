"use client";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import StagePlotPreview from "../components/StagePlotPreview";
import html2canvas from "html2canvas"; // Import html2canvas

const ScreenshotPage = () => {
  const searchParams = useSearchParams();
  const previewRef = useRef<HTMLDivElement>(null);

  // Get the data from URL parameters
  const plotData = searchParams.get("plotData")
    ? JSON.parse(decodeURIComponent(searchParams.get("plotData") || ""))
    : null;

  useEffect(() => {
    const element = previewRef.current;
    if (plotData && element) {
      // Send the element size back to the parent window
      window.opener?.postMessage(
        {
          type: "READY_FOR_SCREENSHOT",
          height: element.offsetHeight,
          width: element.offsetWidth,
        },
        "*"
      );

      const takeScreenshot = async () => {
        try {
          const canvas = await html2canvas(element);
          const screenshot = canvas.toDataURL();

          if (window.opener) {
            window.opener.postMessage(
              {
                type: "SCREENSHOT_CAPTURED",
                screenshot,
              },
              "*"
            );
          }
        } catch (error) {
          console.error("Screenshot failed:", error);
        }
      };

      takeScreenshot();
    }
  }, [plotData]);

  if (!plotData) return <div>No plot data provided</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      asdf
      <div id="previewRef" ref={previewRef}>
        <StagePlotPreview formData={plotData} stagePlotId={plotData.id} />
      </div>
    </div>
  );
};

export default ScreenshotPage;
