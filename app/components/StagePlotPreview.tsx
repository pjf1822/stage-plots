import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StagePlotPreview = ({
  formData,
  stagePlotId,
}: {
  formData: any;
  stagePlotId: any;
}) => {
  return (
    <div>
      {/* Hidden by default, shown when printing/screenshotting */}
      <Card className="bg-white p-8 max-w-4xl mx-auto">
        <CardContent>
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
              <p className="text-gray-600">{formData.description}</p>
            </div>

            {/* Stage Plot Graphic */}
            {/* <div className="my-8">
              <StagePlotGraphic stagePlotId={stagePlotId} />
            </div> */}

            {/* Input List */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Channel List</h2>
              <div className="grid grid-cols-1 gap-4">
                {formData.inputs.map((input) => (
                  <div
                    key={input.id}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <span className="font-medium w-16">
                          Ch {input.channel}
                        </span>
                        <span className="font-medium flex-1">{input.name}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Mic: </span>
                          {input.mic}
                        </div>
                        <div>
                          <span className="font-medium">Stand: </span>
                          {input.stand}
                        </div>
                      </div>
                      {input.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Notes: </span>
                          {input.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StagePlotPreview;
