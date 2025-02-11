import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

type EditPageButtonRowProps = {
  getImage: () => void;
  handleAddInput: () => void;
  isSubmitting: boolean;
  plotSettings: {
    isTwoPages: boolean;
    isBlackAndWhite: boolean;
    isStandsRowShowing: boolean;
  };
  setPlotSettings: React.Dispatch<
    React.SetStateAction<{
      isTwoPages: boolean;
      isBlackAndWhite: boolean;
      isStandsRowShowing: boolean;
    }>
  >;
};
const EditPageButtonRow: React.FC<EditPageButtonRowProps> = ({
  getImage,
  handleAddInput,
  isSubmitting,
  plotSettings,
  setPlotSettings,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-4 mt-4 shadow-lg flex justify-around gap-4 z-30 border-t-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black text-white text-lg px-6 py-0 rounded-lg shadow-xl border border-white">
          Plot Settings
          <span className="ml-2">&#9650;</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-md rounded-md border border-gray-300">
          {/* <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-200">
            <Checkbox
              id="two-pages"
              checked={plotSettings.isTwoPages}
              onCheckedChange={(checked) =>
                setPlotSettings((prev) => ({ ...prev, isTwoPages: !!checked }))
              }
            />
            <label className="text-sm font-medium leading-none cursor-pointer">
              Two pages
            </label>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-200">
            <Checkbox
              id="black-and-white"
              checked={plotSettings.isBlackAndWhite}
              onCheckedChange={(checked) =>
                setPlotSettings((prev) => ({
                  ...prev,
                  isBlackAndWhite: !!checked,
                }))
              }
            />
            <label className="text-sm font-medium leading-none cursor-pointer">
              Black and white
            </label>
          </DropdownMenuItem> */}
          <DropdownMenuItem className="flex items-center gap-2 text-black hover:bg-gray-200">
            <Checkbox
              id="black-and-white"
              checked={plotSettings.isStandsRowShowing}
              onCheckedChange={(checked) =>
                setPlotSettings((prev) => ({
                  ...prev,
                  isStandsRowShowing: !!checked,
                }))
              }
            />
            <label className="text-sm font-medium leading-none cursor-pointer">
              Stands Column?
            </label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        onClick={getImage}
        variant={"outline"}
        type="button"
        className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        Take Screenshot
      </Button>
      <Button
        onClick={handleAddInput}
        variant={"outline"}
        type="button"
        className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        Add input
      </Button>
      <Button
        variant={"outline"}
        type="submit"
        className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        {isSubmitting ? "Submitting..." : "Save Stage Plot"}
      </Button>
    </div>
  );
};

export default EditPageButtonRow;
