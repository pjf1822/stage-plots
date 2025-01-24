"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";
import { submitStagePlotForm } from "@/services/stagePlotService";
import { StagePlotFormData, stagePlotSchema } from "@/types";
import { useState } from "react";

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
      if ("success" in result && result.success) {
        // If the response indicates no changes, skip state update
        console.log(result.message);
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
            <input
              id="name"
              {...register("name")}
              placeholder="Enter stage plot name"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter description"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <StagePlotGraphic stagePlotId={currentPlot.id} />
          <InputList stagePlotId={currentPlot.id} />
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-red-600 m-auto w-full"
          >
            {isSubmitting ? "Submitting..." : "Save Stage Plot"}
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditStagePlot;
