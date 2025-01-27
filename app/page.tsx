import CreateNewPlotButton from "./components/CreateNewPlotButton";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPlots } from "./server/actions/getPlots";
import StagePlots from "./components/StagePlots";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen items-center bg-themeOne justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-16">
        <CreateNewPlotButton />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StagePlots />
      </HydrationBoundary>
    </div>
  );
}
