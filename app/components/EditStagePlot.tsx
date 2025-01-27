"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";
import { submitStagePlotForm } from "@/services/stagePlotService";
import { StagePlotFormData, stagePlotSchema } from "@/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useScreenshot } from "use-react-screenshot";
import { useRef } from "react";
import DownloadModal from "./DownloadModal";
import { Dialog } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getPlotById } from "../server/actions/getPlotById";

const EditStagePlot = ({ plotid }: { plotid: string }) => {
  const { data: plot, isLoading } = useQuery({
    queryKey: ["plot", plotid],
    queryFn: () => getPlotById(plotid),
  });

  if (isLoading) return <div>Loading...</div>;
  const [currentPlot, setCurrentPlot] = useState(plot);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const methods = useForm<StagePlotFormData>({
    resolver: zodResolver(stagePlotSchema),
    defaultValues: {
      name: currentPlot.name,
      description: currentPlot.description,
      inputs: currentPlot.inputs,
      stage_elements: currentPlot.stage_elements,
      created_by: currentPlot.created_by,
      id: currentPlot.id,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const submitForm = async (formData: StagePlotFormData) => {
    try {
      const result = await submitStagePlotForm(currentPlot, formData);
      toast({
        title: "Stage Plot Updated",
      });
      if ("success" in result && result.success) {
        return;
      }
      setCurrentPlot(result);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const formRef = useRef<HTMLDivElement>(null);

  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => {
    setIsModalOpen(true);
    takeScreenshot(formRef.current);
  };
  const downloadImage = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "stage_plot.png";
      link.click();
    }
  };
  return (
    <div>
      <FormProvider {...methods}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(submitForm, (errors) => {})}>
            <div ref={formRef}>
              <div className="mb-6">
                <label htmlFor="name">Stage Plot Name:</label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter stage plot name"
                  className="w-full px-4  border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="description">Description:</label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter description"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <StagePlotGraphic stagePlotId={currentPlot.id} />
              <InputList stagePlotId={currentPlot.id} />
            </div>
            <div className="flex justify-center">
              <Button type="submit" variant="default" size="lg">
                {isSubmitting ? "Submitting..." : "Save Stage Plot"}
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
      <button
        onClick={getImage}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Take Screenshot
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {image && <DownloadModal image={image} downloadImage={downloadImage} />}
      </Dialog>
    </div>
  );
};

export default EditStagePlot;
