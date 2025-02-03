"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPlots } from "../server/actions/getPlots";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const StagePlots = () => {
  const { data } = useQuery({
    queryKey: ["stagePlots"],
    queryFn: getPlots,
  });
  // const data = {
  //   data: [
  //     {
  //       name: "fuck",
  //       description: "sjhit",
  //       created_by: "53c17524-7fdc-49a3-8e22-0abddf4d9a28",
  //       id: "7e29aa46-255e-4585-a0bd-a847ceadade5",
  //     },
  //     {
  //       name: "fuckasdf",
  //       description: "sjhit",
  //       created_by: "53c17524-7fdc-49a3-8e22-0abddf4d9a28",
  //       id: "7e29ada46-2554d-4585-a0bd-a847ceadade5",
  //     },
  //     {
  //       name: "fuckasdf",
  //       description: "sjhit",
  //       created_by: "53c17524-7fdc-49a3-8e22-0abddf4d9a28",
  //       id: "7e29a4a46-2554d-4585-a0bd-a847ceadade5",
  //     },
  //     {
  //       name: "fuckasdf",
  //       description: "sjhit",
  //       created_by: "53c17524-7fdc-49a3-8e22-0abddf4d9a28",
  //       id: "7e29aat46-255f4-4585-a0bd-a847ceadade5",
  //     },
  //   ],
  // };
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
        <p className="font-urbanist text-4xl font-bold text-white">
          Add your first stage plot! ya bish!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden  max-w-[900px]" ref={emblaRef}>
        <div style={{ display: "flex" }}>
          {data?.data?.map((plot: any) => (
            <div
              key={plot.id}
              style={{ flex: "0 0 66.66%" }}
              className="flex-shrink-0 "
            >
              <Link href={`/plots/${plot.id}`}>
                <Card
                  className={`h-[500px] ${
                    data?.data?.length === 1 ? "" : "mr-16"
                  } bg-black min-w-[300px] shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-center items-center flex-col`}
                >
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
                        {plot.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {data?.data?.length && data.data.length > 1 && (
        <div className="w-full flex justify-between pt-8">
          <Button
            className="z-10 px-6 py-3 rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
            onClick={scrollPrev}
          >
            Prev
          </Button>
          <Button
            className="z-10 px-6 py-3 rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 font-urbanist"
            onClick={scrollNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default StagePlots;
