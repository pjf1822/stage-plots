import { getPlotById } from "@/app/server/actions/getPlotById";
import React from "react";

const StagePlotPage = async ({
  params,
}: {
  params: Promise<{ plotid: string }>;
}) => {
  const plotid = (await params).plotid;
  const stagePlot = await getPlotById(plotid);
  return (
    <div>
      {plotid}
      <ul>
        {stagePlot.result.inputs.map((input: any) => (
          <li key={input.id}>
            {input.name} - {input.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StagePlotPage;
