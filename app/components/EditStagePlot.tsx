"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import InputList from "./InputList";
import StagePlotGraphic from "./StagePlotGraphic";
import { submitStagePlotForm } from "@/services/stagePlotService";
import { StagePlotFormData, stagePlotSchema } from "@/types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlotById } from "../server/actions/getPlotById";
import { v4 as uuidv4 } from "uuid";

import EditPageButtonRow from "./EditPageButtonRow";

const EditStagePlot = ({ plotid }: { plotid: string }) => {
  // useTipsAndTricks();

  const { data: plot, isLoading } = useQuery({
    queryKey: ["plot", plotid],
    queryFn: () => getPlotById(plotid),
  });

  if (isLoading) return <div>Loading...</div>;
  const [currentPlot, setCurrentPlot] = useState(plot);

  const formRef = useRef<HTMLDivElement>(null);
  const methods = useForm<StagePlotFormData>({
    resolver: zodResolver(stagePlotSchema),
    defaultValues: {
      name: currentPlot.name,
      description: currentPlot.description,
      inputs: currentPlot.inputs,
      stage_elements: currentPlot.stage_elements,
      created_by: currentPlot.created_by,
      id: currentPlot.id,
      is_stands_showing: currentPlot.is_stands_showing,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
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

  const handleAddInput = () => {
    const inputs = getValues("inputs");
    const nextChannel = inputs.length + 1;
    if (nextChannel > 48) {
      toast({
        title: "Cannot add more than 48 channels",
        variant: "destructive",
      });
      return;
    }

    const newInput = {
      id: uuidv4(),
      name: "",
      channel: nextChannel,
      mic: "",
      stand: "",
      notes: "",
      stage_plot_id: plotid,
    };

    setValue("inputs", [...inputs, newInput]);
  };

  const handleRemoveInput = (channel: number) => {
    const inputs = getValues("inputs");
    const updatedFields = inputs.filter((input) => input.channel !== channel);
    const reIndexedFields = updatedFields.map((field, i) => ({
      ...field,
      channel: i + 1,
    }));

    setValue("inputs", reIndexedFields);
  };

  const [containerWidth, setContainerWidth] = useState<number>(1500);
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth * 0.89);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-8" id="capture-area">
      <FormProvider {...methods}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(submitForm, (errors) => {})}>
            <div ref={formRef}>
              <div className=" h-16 mt-8">
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter stage plot name"
                  className="w-full   border-none bg-transparent focus:outline-none text-center"
                  style={{ fontSize: "3rem", height: "100%" }}
                />
              </div>

              <StagePlotGraphic
                stagePlotId={currentPlot.id}
                containerWidth={containerWidth}
              />
              <InputList handleRemoveInput={handleRemoveInput} />
            </div>
            <EditPageButtonRow
              handleAddInput={handleAddInput}
              isSubmitting={isSubmitting}
              isQuickPlot={false}
            />
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default EditStagePlot;
