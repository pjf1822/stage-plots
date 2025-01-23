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
  } = methods;

  const submitForm = async (formData: StagePlotFormData) => {
    try {
      const result = await submitStagePlotForm(plot, formData);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
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
          <div>
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
          <InputList stagePlotId={plot.id} />

          <button type="submit">
            {isSubmitting ? "Submitting..." : "Save Stage Plot"}
          </button>
          <StagePlotGraphic
            stageElements={plot.stage_elements}
            stagePlotId={plot.id}
          />
        </form>
      </div>
    </FormProvider>
  );
};

export default EditStagePlot;
