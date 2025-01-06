import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import StagePlots from "../components/StagePlots";
import { getPlots } from "../server/actions/getPlots";

const StagePlotsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StagePlots />
      </HydrationBoundary>
    </div>
  );
};

export default StagePlotsPage;
