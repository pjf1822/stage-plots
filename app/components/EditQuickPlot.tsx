"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { StagePlotFormData, stagePlotSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useScreenshot } from "use-react-screenshot";
import { v4 as uuidv4 } from "uuid";
import StagePlotGraphic from "./StagePlotGraphic";
import InputList from "./InputList";
import EditPageButtonRow from "./EditPageButtonRow";
import { Dialog } from "@radix-ui/react-dialog";
import DownloadModal from "./DownloadModal";
import useTipsAndTricks from "@/hooks/useTipsAndTricks";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plotSettings, setPlotSettings] = useState({
    isTwoPages: false,
    isBlackAndWhite: true,
    isStandsRowShowing: false,
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
  const [image, takeScreenshot] = useScreenshot();

  const getImage = () => {
    const formData = methods.getValues();

    const screenshotWindow = window.open(
      `/screenshot?plotData=${encodeURIComponent(
        JSON.stringify(formData)
      )}&plotSettings=${encodeURIComponent(JSON.stringify(plotSettings))}`,
      "Screenshot"
    );

    window.addEventListener("message", async (event) => {
      if (event.data.type === "READY_FOR_SCREENSHOT") {
        setTimeout(async () => {
          const element = screenshotWindow?.document.querySelector(
            "#previewRef"
          ) as HTMLElement | null;

          const screenshot = await takeScreenshot(element);

          screenshotWindow?.close();

          setIsModalOpen(true);
        }, 400);
      }
    });
  };

  const downloadImage = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = `${currentPlot.name}.png`;
      link.click();
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

  return (
    <div className="mt-8">
      <FormProvider {...methods}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <form
            onSubmit={handleSubmit(
              () => {},
              (errors) => {}
            )}
          >
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
              {/* <div className="mb-6">
                <label htmlFor="description">Description:</label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter description"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div> */}
              <StagePlotGraphic stagePlotId={currentPlot.id} />
              <InputList handleRemoveInput={handleRemoveInput} />
            </div>
            <EditPageButtonRow
              getImage={getImage}
              handleAddInput={handleAddInput}
              isSubmitting={isSubmitting}
              isQuickPlot={true}
            />
          </form>
        </div>
      </FormProvider>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {image && <DownloadModal image={image} downloadImage={downloadImage} />}
      </Dialog>
    </div>
  );
};

export default EditQuickPlot;
