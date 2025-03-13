import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import Link from "next/link";

import DownloadDialog from "./DownloadDialog";

type EditPageButtonRowProps = {
  handleAddInput: () => void;
  handleAddOutput: () => void;
  isSubmitting: boolean;
  isQuickPlot: boolean;
  zoom: any;
};
const EditPageButtonRow: React.FC<EditPageButtonRowProps> = ({
  handleAddInput,
  isSubmitting,
  isQuickPlot = false,
  zoom,
  handleAddOutput,
}) => {
  const { watch, setValue } = useFormContext();
  const isStandsShowing = watch("is_stands_showing");
  const isOutputsShowing = watch("is_outputs_showing");
  const bandName = watch("name");

  const handleAddMultipleInputs = (num: number) => {
    for (let i = 0; i < num; i++) {
      handleAddInput();
    }
  };
  const handleAddMultipleOutputs = (num: number) => {
    for (let i = 0; i < num; i++) {
      handleAddOutput();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-4 mt-4 shadow-lg flex justify-around gap-4 z-30 border-t-2 ignore-me">
      {isQuickPlot && (
        <Button
          asChild
          className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          <Link
            href="/"
            className="border border-white px-6 py-6 rounded-lg text-white"
          >
            Home
          </Link>
        </Button>
      )}

      {/* <Button
        onClick={takeScreenshot}
        variant={"outline"}
        type="button"
        className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        Convert to PDF
      </Button> */}
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-black text-white text-lg px-6 py-2 rounded-lg shadow-xl border border-white">
            Add Inputs
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-300 max-h-60 overflow-y-auto">
            {[...Array(48).keys()].map((i) => (
              <DropdownMenuItem
                key={i}
                className="text-black hover:bg-gray-200"
                onClick={() => handleAddMultipleInputs(i + 1)}
              >
                Add {i + 1} Input{i + 1 > 1 ? "s" : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-black text-white text-lg px-6 py-2 rounded-lg shadow-xl border border-white">
            Add Outputs
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-300 max-h-60 overflow-y-auto">
            {[...Array(48).keys()].map((i) => (
              <DropdownMenuItem
                key={i}
                className="text-black hover:bg-gray-200"
                onClick={() => handleAddMultipleOutputs(i + 1)}
              >
                Add {i + 1} Outputs{i + 1 > 1 ? "s" : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isQuickPlot && (
        <Button
          variant={"outline"}
          type="submit"
          className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          {isSubmitting ? "Submitting..." : "Save Stage Plot"}
        </Button>
      )}
      <DownloadDialog bandName={bandName} zoom={zoom} />

      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black text-white text-lg px-6 py-0 rounded-lg shadow-xl border border-white">
          Plot Settings
          <span className="ml-2">&#9650;</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-300">
          <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-200">
            <Checkbox
              id="stands-showing"
              checked={isStandsShowing}
              onCheckedChange={(checked) => {
                setValue("is_stands_showing", checked);
              }}
            />

            <label className="text-sm font-medium leading-none cursor-pointer">
              Stands Column?
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-200">
            <Checkbox
              id="outputs_showing"
              checked={isOutputsShowing}
              onCheckedChange={(checked) => {
                setValue("is_outputs_showing", checked);
              }}
            />

            <label className="text-sm font-medium leading-none cursor-pointer">
              Outputs Column?
            </label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditPageButtonRow;
