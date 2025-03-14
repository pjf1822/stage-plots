import EditStagePlot from "@/app/components/EditStagePlot";
import { getPlotById } from "@/app/server/actions/getPlotById";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Head from "next/head";
import React from "react";

const StagePlotPage = async ({
  params,
}: {
  params: Promise<{ plotid: string }>;
}) => {
  const { plotid } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["plot", plotid],
    queryFn: () => getPlotById(plotid),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Head>
        <title>Stage Plot - {plotid}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center pb-24 overflow-hidden w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EditStagePlot plotid={plotid} />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default StagePlotPage;
