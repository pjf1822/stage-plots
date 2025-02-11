import React from "react";
import { CardContent } from "@/components/ui/card";
import StagePlotGraphicPrint from "./StagePlotGraphicPrint";
import PreviewInputList from "./PreviewInputList";

const StagePlotPreview = ({
  formData,
  plotSettings,
}: {
  formData: any;
  plotSettings: any;
}) => {
  return (
    <div className="bg-white mx-auto">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div className="text-center">
            <h1
              className={`text-5xl font-bold mt-0 font-urbanist ${
                formData.description ? "mb-4" : "mb-12"
              }`}
            >
              {formData.name}
            </h1>
            {formData.description && (
              <p className="text-gray-600 my-8 text-xl">
                {formData.description}
              </p>
            )}
          </div>

          <div className="my-8">
            <StagePlotGraphicPrint stage_elements={formData.stage_elements} />
          </div>

          <div className="w-[90vw] mx-auto">
            <PreviewInputList
              inputs={formData.inputs}
              plotSettings={plotSettings}
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default StagePlotPreview;
