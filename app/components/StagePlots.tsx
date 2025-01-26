"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPlots } from "../server/actions/getPlots";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {data?.data?.map((plot: any) => (
            <CarouselItem
              key={plot.id}
              className="md:basis-1/2 lg:basis-1/2 pl-2"
            >
              <Link href={`/plots/${plot.id}`}>
                <Card className="w-full max-w-md mx-auto p-4 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg cursor-pointer hover:bg-gray-50">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-800 truncate font-urbanist">
                      {plot.name || "Untitled Plot"}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 font-urbanist">
                      {plot.description || "No description available"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default StagePlots;
