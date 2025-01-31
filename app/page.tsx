import CreateNewPlotButton from "./components/CreateNewPlotButton";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPlots } from "./server/actions/getPlots";
import StagePlots from "./components/StagePlots";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StagePlots />
      </HydrationBoundary>
      <div className="mt-16">
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
            className="rounded-full"
          />
        </Button>
      </Link>
    </div>
  );
}
