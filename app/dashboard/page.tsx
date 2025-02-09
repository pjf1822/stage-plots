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
        <Link
          href="https://buymeacoffee.com/pforbeswebdev"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50"
        >
          <Button variant="outline" className="p-0 rounded-full shadow-lg">
            <Image
              src="/bmc-button.png"
              alt="Buy Me a Coffee"
              width={120}
              height={40}
              className="h-12 w-12 p-2 rounded-full"
            />
          </Button>
        </Link>
      </div>
    </>
  );
}
