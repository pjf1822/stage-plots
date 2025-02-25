import React from "react";
import { CardContent } from "@/components/ui/card";
import StagePlotGraphicPrint from "./StagePlotGraphicPrint";
import PreviewInputList from "./PreviewInputList";

const StagePlotPreview: React.FC<{
  formData: any;
  plotSettings: { isStandsRowShowing: boolean }; // Adjust this to match the structure of plotSettings
}> = ({ formData, plotSettings }) => {
  return (
    <div className="bg-white mx-auto">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div className="text-center">
            <h1
              className={`text-6xl font-bold mt-0 font-urbanist  -translate-y-[20px]`}
              style={{ marginBottom: 20 }}
            >
              {formData.name}
            </h1>
          </div>

          <div className="my-8">
            <StagePlotGraphicPrint stage_elements={formData.stage_elements} />
          </div>

          <div className="w-[98vw] mx-auto">
            <PreviewInputList inputs={formData.inputs} formData={formData} />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default StagePlotPreview;
