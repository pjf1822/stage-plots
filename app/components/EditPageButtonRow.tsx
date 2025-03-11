import { Button } from "@/components/ui/button";
import React from "react";
import { jsPDF } from "jspdf";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import { getImage } from "@/utils/getImage";
import html2canvas from "html2canvas";

type EditPageButtonRowProps = {
  handleAddInput: () => void;
  isSubmitting: boolean;
  isQuickPlot: boolean;
  zoom: any;
};
const EditPageButtonRow: React.FC<EditPageButtonRowProps> = ({
  handleAddInput,
  isSubmitting,
  isQuickPlot = false,
  zoom,
}) => {
  const { watch, setValue } = useFormContext();
  const isStandsShowing = watch("is_stands_showing");
  const bandName = watch("name");

  const handleAddMultipleInputs = (num: number) => {
    for (let i = 0; i < num; i++) {
      handleAddInput();
    }
  };
  const takeScreenshot = async () => {
    const input = document.getElementById("name") as HTMLInputElement;
    const inputValue = input.value;
    const editDate = document.querySelector(".editDate") as HTMLElement;
    if (editDate) {
      editDate.style.display = "block";
    }

    // Create a span to replace the input
    const span = document.createElement("span");
    span.textContent = inputValue;
    span.style.fontSize = "4rem";
    span.style.textAlign = "center";
    span.style.display = "flex";
    span.style.justifyContent = "center"; // Center horizontally
    span.style.alignItems = "center"; // Center vertically
    span.style.width = "100%"; // Ensure it takes full width of its parent
    span.style.height = "100%";
    span.style.fontFamily = "urbanist";
    span.style.transform = "translateY(-44px)";

    // Replace input with span
    if (input.parentNode) {
      input.parentNode.replaceChild(span, input);
    }
    const element = document.querySelector(".mt-8");

    // Ensure that 'element' is not null before using it
    if (!element || !(element instanceof HTMLElement)) {
      console.error("Element with class '.mt-8' not found.");
      return;
    }
    try {
      const canvas = await html2canvas(element, {
        ignoreElements: (el) => el.classList.contains("ignore-me"),
      });

      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFillColor(243, 244, 246); // RGB values for #f3f4f6
      doc.rect(0, 0, pageWidth, pageHeight, "F"); // Fill the entire page

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const aspectRatio = canvasWidth / canvasHeight;

      let imgWidth = pageWidth;
      let imgHeight = pageWidth / aspectRatio;
      const scaleFactor = 1 / zoom;
      console.log(zoom, scaleFactor);
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;

      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = pageHeight * aspectRatio;
      }
      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 0;

      doc.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

      doc.save(`${bandName.replace(/\s+/g, "-")}.pdf`);

      // const link = document.createElement("a");

      // link.href = imgData;
      // link.download = `${bandName.replace(/\s+/g, "-")}.png`;
      // link.click();
      // console.log("Screenshot captured and download initiated");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      // Restore input field after screenshot
      const spanParent = span.parentNode;
      if (spanParent && spanParent instanceof HTMLElement) {
        spanParent.replaceChild(input, span);
      }
      editDate.style.display = "none";
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

      <Button
        onClick={takeScreenshot}
        variant={"outline"}
        type="button"
        className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
      >
        Convert to PDF
      </Button>
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
      {!isQuickPlot && (
        <Button
          variant={"outline"}
          type="submit"
          className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          {isSubmitting ? "Submitting..." : "Save Stage Plot"}
        </Button>
      )}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditPageButtonRow;
