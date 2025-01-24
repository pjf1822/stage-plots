import EditStagePlot from "@/app/components/EditStagePlot";
import { getPlotById } from "@/app/server/actions/getPlotById";

import React from "react";

const StagePlotPage = async ({
  params,
}: {
  params: Promise<{ plotid: string }>;
}) => {
  const { plotid } = await params;

  const { result: plot, error } = await getPlotById(plotid);

  if (!plot || error) {
    return <div>Stage Plot doesnt exist</div>;
  }

  return (
    <div className="min-h-screen bg-themeOne flex items-center justify-center">
      <EditStagePlot plot={plot} />
    </div>
  );
};

export default StagePlotPage;
