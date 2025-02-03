"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPlots } from "../server/actions/getPlots";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const StagePlots = () => {
  const { data } = useQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
      {data?.data?.length === 1 ? (
        <Link href={`/plots/${data.data[0].id}`}>
          <Card className="w-full  h-full max-w-md mx-auto p-4 bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-lg cursor-pointer transform hover:scale-105">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800 truncate font-urbanist">
                {data.data[0].name || "Untitled Plot"}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 font-urbanist">
                {data.data[0].description || "No description available"}
              </p>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div className="overflow-hidden  max-w-[700px]" ref={emblaRef}>
          <div style={{ display: "flex" }}>
            {data?.data?.map((plot: any) => (
              <div
                key={plot.id}
                style={{ flex: "0 0 66.66%" }}
                className="flex-shrink-0"
              >
                <Link href={`/plots/${plot.id}`}>
                  <Card className="h-[500px] mr-16 bg-black  shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-center items-center flex-col">
                    <Image
                      src="/favicon.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                    <CardHeader className=" justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-4 font-urbanist text-white">
                          {plot.name || "Untitled Plot"}
                        </CardTitle>
                        <CardDescription className="text-lg font-urbanist text-white">
                          {plot.description || "No description available"}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-between">
            <Button
              className="embla__prev  z-10 px-4 py-2 rounded-full"
              onClick={scrollPrev}
            >
              Prev
            </Button>
            <Button
              className="embla__next  z-10 px-4 py-2 rounded-full"
              onClick={scrollNext}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StagePlots;
