"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";
import { Input, StagePlotWithInputs } from "@/types";
import { submitStagePlotForm } from "@/services/stagePlotService";

const stagePlotSchema = z.object({
  name: z.string().min(1, "Stage Plot Name is required"),
  description: z.string(),
  inputs: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Input name is required"),
        type: z.string().optional(),
      })
    )
    .default([]),
});
type StagePlotFormData = z.infer<typeof stagePlotSchema>;

const EditStagePlot = ({ plot }: { plot: StagePlotWithInputs }) => {
  const methods = useForm<StagePlotFormData>({
    resolver: zodResolver(stagePlotSchema),
    defaultValues: {
      name: plot.name,
      description: plot.description || "",
      inputs: plot.inputs || [],
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
        <form
          onSubmit={handleSubmit(submitForm, (errors) => {
            console.log("Validation errors on form submission:", errors);
          })}
        >
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
          <InputList />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save Stage Plot"}
          </button>
        </form>
        <StagePlotGraphic />
      </div>
    </FormProvider>
  );
};

export default EditStagePlot;
