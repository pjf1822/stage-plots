"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";
import { submitStagePlotForm } from "@/services/stagePlotService";
import { StagePlotFormData, stagePlotSchema } from "@/types";

const EditStagePlot = ({ plot }: any) => {
  const methods = useForm<StagePlotFormData>({
    resolver: zodResolver(stagePlotSchema),
    defaultValues: {
      name: plot.name,
      description: plot.description,
      inputs: plot.inputs,
      stage_elements: plot.stage_elements,
      created_by: plot.created_by,
      id: plot.id,
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
      const result = await submitStagePlotForm(plot, formData);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="relative">
        <form onSubmit={handleSubmit(submitForm, (errors) => {})}>
          <div>
            <label htmlFor="name">Stage Plot Name:</label>
            <input
              id="name"
              {...register("name")}
              placeholder="Enter stage plot name"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div id="fuck-eyah">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          <StagePlotGraphic stagePlotId={plot.id} />
          <InputList stagePlotId={plot.id} />
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
