"use client"; // Ensure this is executed client-side

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import StagePlotPreview from "../components/StagePlotPreview";
import html2canvas from "html2canvas"; // Import html2canvas

const ScreenshotPage = () => {
  const searchParams = useSearchParams();
  const previewRef = useRef<HTMLDivElement>(null);
  const [plotData, setPlotData] = useState<any>(null);
  const [plotSettings, setPlotSettings] = useState<any>(null); // Add a state for plotSettings

  useEffect(() => {
    const plotDataParam = searchParams.get("plotData");
    if (plotDataParam) {
      setPlotData(JSON.parse(decodeURIComponent(plotDataParam)));
    }
    const plotSettingsParam = searchParams.get("plotSettings");
    if (plotSettingsParam) {
      setPlotSettings(JSON.parse(decodeURIComponent(plotSettingsParam)));
    }
  }, [searchParams]);

  // Take the screenshot after plotData is available
  useEffect(() => {
    if (!plotData) return;

    const element = previewRef.current;
    if (element) {
      window.opener?.postMessage(
        {
          type: "READY_FOR_SCREENSHOT", // Notify the parent window it's ready for screenshot
          height: element.offsetHeight,
          width: element.offsetWidth,
        },
        "*"
      );

      const takeScreenshot = async () => {
        try {
          const canvas = await html2canvas(element, {
            scale: window.devicePixelRatio, // Improve image quality
            width: element.scrollWidth, // Capture full width
            height: element.scrollHeight, // Capture full height
          });
          const screenshot = canvas.toDataURL();

          // Send the screenshot back to the parent window
          window.opener?.postMessage(
            {
              type: "SCREENSHOT_CAPTURED",
              screenshot,
            },
            "*"
          );
        } catch (error) {
          console.error("Screenshot failed:", error);
        }
      };

      takeScreenshot();
    }
  }, [plotData]);

  if (!plotData) return <div>No plot data provided</div>;

  return (
    <div className="p-0 bg-white min-h-screen">
      <div
        id="previewRef"
        ref={previewRef}
        className="w-[100vw] max-w-[1400px]"
      >
        <StagePlotPreview plotSettings={plotSettings} formData={plotData} />
      </div>
    </div>
  );
};

const SuspendedScreenshotPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScreenshotPage />
    </Suspense>
  );
};

export default SuspendedScreenshotPage;
