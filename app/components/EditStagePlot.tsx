"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";

const stagePlotSchema = z.object({
  name: z.string().min(1, "Stage Plot Name is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  inputs: z.array(
    z.object({
      name: z.string().min(1, "Input name is required"),
      type: z.string().optional(),
    })
  ),
});
type StagePlotFormData = z.infer<typeof stagePlotSchema>;

const EditStagePlot = ({ plot }: StagePlotFormData) => {
  const methods = useForm<StagePlotFormData>({
    resolver: zodResolver(stagePlotSchema), // Validate with Zod
    defaultValues: plot ?? {
      name: "",
      description: "",
      inputs: [{ name: "", type: "" }],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const submitForm = async (data: StagePlotFormData) => {
    const requestData = plot.id ? { ...data, stagePlotId: plot.id } : data;
    const response = await fetch("/api/stage-plots/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Stage plot created successfully!");
    } else {
      alert("Error creating stage plot: " + result.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form>
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
          <InputList inputs={plot.inputs} />

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
