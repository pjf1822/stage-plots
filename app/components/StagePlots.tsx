"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPlots } from "../server/actions/getPlots";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <div className="space-y-4">
      {data?.data?.map((plot: any) => (
        <Link href={`/plots/${plot.id}`} key={plot.id}>
          <Card className="w-full max-w-md mx-auto p-4 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg cursor-pointer hover:bg-gray-50">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {plot.name || "Untitled Plot"}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {plot.description || "No description available"}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default StagePlots;
