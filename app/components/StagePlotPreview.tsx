import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import StagePlotGraphicPrint from "./StagePlotGraphicPrint";

const StagePlotPreview = ({
  formData,
}: {
  formData: any;
  stagePlotId: any;
}) => {
  return (
    // <div>
    <div className="bg-white p-8 max-w-4xl mx-auto">
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
            <p className="text-gray-600">{formData.description}</p>
          </div>

          {/* Stage Plot Graphic */}
          <div className="my-8">
            <StagePlotGraphicPrint stage_elements={formData.stage_elements} />
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-2 text-left">
                    Channel
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 bg-gray-100 p-2 text-left">
                    Mic
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.inputs.map((input: any) => (
                  <tr key={input.id}>
                    <td className="border border-gray-300 p-2">
                      Ch {input.channel}
                    </td>
                    <td className="border border-gray-300 p-2">{input.name}</td>
                    <td className="border border-gray-300 p-2">{input.mic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </div>
    // </div>
  );
};

export default StagePlotPreview;
