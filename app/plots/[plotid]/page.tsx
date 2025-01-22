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
    return <div>Error loading plot.</div>;
  }

  return <EditStagePlot plot={plot} />;
};

export default StagePlotPage;
