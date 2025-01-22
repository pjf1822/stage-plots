"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPlots } from "../server/actions/getPlots";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const StagePlots = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }
  return (
    <div>
      {data?.data?.map((plot: any, index: number) => (
        <Link href={`/plots/${plot.id}`} key={plot.id}>
          <h1 key={index}>{plot.name || "Untitled Plot"}</h1>
        </Link>
      ))}
    </div>
  );
};

export default StagePlots;
