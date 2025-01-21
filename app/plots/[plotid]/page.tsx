import EditStagePlot from "@/app/components/EditStagePlot";
import { getPlotById } from "@/app/server/actions/getPlotById";

import React from "react";

const StagePlotPage = async ({
  params,
}: {
  params: Promise<{ plotid: string }>;
}) => {
  const { plotid } = await params;

  // Fetch the stage plot using `plotid`
  const plot = await getPlotById(plotid);

  return <EditStagePlot plot={plot.result} />;
};

export default StagePlotPage;
