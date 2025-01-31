import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import StagePlotGraphicPrint from "./StagePlotGraphicPrint";
import PreviewInputList from "./PreviewInputList";

const StagePlotPreview = ({ formData }: { formData: any }) => {
  return (
    <div className="bg-white mx-auto">
      <CardContent className="p-0">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-16">{formData.name}</h1>
            <p className="text-gray-600">{formData.description}</p>
          </div>

          <div className="my-8">
            <StagePlotGraphicPrint stage_elements={formData.stage_elements} />
          </div>

          <div className="w-[70vw] mx-auto">
            <PreviewInputList inputs={formData.inputs} />
          </div>
        </div>
      </CardContent>
    </div>
    // </div>
  );
};

export default StagePlotPreview;
