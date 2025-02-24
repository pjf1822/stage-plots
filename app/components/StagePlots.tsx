"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPlots } from "../server/actions/getPlots";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react"; // For the X icon

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const StagePlots = () => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<any>(null); // Track the selected plot for deletion

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
        <p className="font-urbanist text-4xl font-bold text-white">
          Add your first stage plot!
        </p>
      </div>
    );
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/stage-plots/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete stage plot");
      }
      toast({ title: `Deleted ${name} ` });

      await queryClient.invalidateQueries({ queryKey: ["stagePlots"] });
    } catch (error) {
      console.error("Error deleting stage plot:", error);
    }
  };

  const openDeleteModal = (plot: any) => {
    setSelectedPlot(plot);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedPlot(null);
  };
  return (
    <div className="space-y-4">
      <div
        className={`overflow-hidden  max-w-[1000px] border-4  ${
          data?.data?.length === 1 ? "border-none" : "border-white"
        }  border-white p-16 rounded-[10px]`}
        ref={emblaRef}
      >
        <div style={{ display: "flex" }}>
          {data?.data?.map((plot: any) => (
            <div
              key={plot.id}
              style={{ flex: "0 0 66.66%" }}
              className="flex-shrink-0 relative "
            >
              <Link href={`/plots/${plot.id}`}>
                <Card
                  className={`h-[350px] ${
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
              <Button
                onClick={() => openDeleteModal(plot)}
                className={`absolute bottom-2 ${
                  data?.data?.length === 1 ? "right-2" : "right-16"
                } -translate-x-2 text-white rounded-full p-2 hover:bg-red-600 transition-all !bg-transparent`}
              >
                <X size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>
      {data?.data?.length && data.data.length > 1 && (
        <div className="w-full flex justify-between pt-2">
          <Button
            className="z-10 px-8 py-6 text-lg rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-110 font-urbanist"
            onClick={scrollPrev}
          >
            Prev
          </Button>
          <Button
            className="z-10 px-8 py-6 text-lg rounded-full bg-black text-white border border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out transform hover:scale-110 font-urbanist"
            onClick={scrollNext}
          >
            Next
          </Button>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black text-white rounded-lg p-4 w-[400px] h-[300px] mx-auto shadow-lg font-urbanist">
          <DialogTitle className="text-xxl font-semibold ">
            Confirm Deletion
          </DialogTitle>

          <DialogDescription className="my-2 text-lg text-white">
            Are you sure you want to delete the stage plot "
            {selectedPlot?.name || "Untitled Plot"}"?
          </DialogDescription>
          <div className="flex justify-between gap-4">
            <Button
              onClick={closeDeleteModal}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black text-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                selectedPlot &&
                  handleDelete(selectedPlot.id, selectedPlot.name);
                closeDeleteModal();
              }}
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white text-lg"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StagePlots;
