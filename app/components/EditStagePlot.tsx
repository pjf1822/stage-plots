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

const EditStagePlot = ({ plot }: any) => {
  const [currentPlot, setCurrentPlot] = useState(plot);

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
    watch,
  } = methods;
  const shit = watch();

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
  return (
    <FormProvider {...methods}>
      <div className=" bg-gray-100 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(submitForm, (errors) => {})}>
          <div className="mb-6">
            <label htmlFor="name">Stage Plot Name:</label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter stage plot name"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <div className="flex justify-center ">
            <Button type="submit" variant="default" size="lg">
              {isSubmitting ? "Submitting..." : "Save Stage Plot"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditStagePlot;
