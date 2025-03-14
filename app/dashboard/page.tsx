import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPlots } from "@/app/server/actions/getPlots";
import StagePlots from "@/app/components/StagePlots";
import CreateNewPlotButton from "@/app/components/CreateNewPlotButton";
import Head from "next/head";
import { Dialog } from "@/components/ui/dialog";
import SuggestionDialog from "../components/SuggestionDialog";
export default async function Dashboard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Head>
        <title>dashboard</title>
        <meta name="description" content="dashboard" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="dashboard" />
        <meta property="og:description" content="dashboard" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-[calc(100vh-139px)] flex flex-col justify-center items-center bg-black justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StagePlots />
        </HydrationBoundary>
        <div>
          <CreateNewPlotButton />
        </div>
        <SuggestionDialog />
      </div>
    </>
  );
}
