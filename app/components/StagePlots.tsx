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
  const { data } = useQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
  });

  if (!data || data?.data?.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="font-urbanist text-4xl font-bold text-themeThree">
          Add your first stage plot! ya bish!
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Carousel opts={{ loop: true }} className="relative">
        <CarouselContent className="h-full">
          {data?.data?.map((plot: any) => (
            <CarouselItem
              key={plot.id}
              className="md:basis-1/2 lg:basis-1/3 pl-2 pb-8"
            >
              <Link href={`/plots/${plot.id}`}>
                <Card className="w-full h-full max-w-md mx-auto p-4 bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-lg cursor-pointer  transform hover:scale-105">
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
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-6">
          <CarouselPrevious className="bg-themeThree text-white p-2 rounded-full hover:bg-themeTwo transition duration-300 ease-in-out">
            Prev
          </CarouselPrevious>
          <CarouselNext className="bg-themeThree text-white p-2 rounded-full hover:bg-themeTwo transition duration-300 ease-in-out">
            Next
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export default StagePlots;
