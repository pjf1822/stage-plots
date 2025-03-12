"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { StagePlotFormData, stagePlotSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import StagePlotGraphic from "./StagePlotGraphic";
import InputList from "./InputList";
import EditPageButtonRow from "./EditPageButtonRow";
import useTipsAndTricks from "@/hooks/useTipsAndTricks";
import { Slider } from "@/components/ui/slider";

const EditQuickPlot = () => {
  useTipsAndTricks();

  const [currentPlot, setCurrentPlot] = useState({
    name: "Quick Plot",
    description: "",
    inputs: [{ id: "", name: "", channel: 1, mic: "", stand: "" }],
    stage_elements: [],
    created_by: "",
    id: "",
  });

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
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = methods;

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
      stage_plot_id: "",
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

  const [zoom, setZoom] = useState(1);

  return (
    <div className="mt-8">
      {/* <div
        style={{ position: "absolute", top: "5px", left: "10px" }}
        className="ignore-me"
      >
        <div className="bg-gray-300 p-2 rounded">
          <Slider
            value={[zoom * 100]}
            min={70}
            max={100}
            step={1}
            onValueChange={(val) => setZoom(val[0] / 100)}
            className="w-48"
          />
        </div>
        <p style={{ color: "white", fontFamily: "urbanist" }}>Zoom</p>
      </div> */}
      <FormProvider {...methods}>
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <form
            onSubmit={handleSubmit(
              () => {},
              (errors) => {}
            )}
          >
            <div
              ref={formRef}
              style={{
                transform: `scale(${zoom})`,
              }}
            >
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
              isQuickPlot={true}
              zoom={zoom}
            />
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default EditQuickPlot;
