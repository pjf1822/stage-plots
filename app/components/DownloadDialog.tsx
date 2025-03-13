"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";

const DownloadDialog = ({
  bandName,
  zoom,
}: {
  bandName: string;
  zoom: number;
}) => {
  const [format, setFormat] = useState<"pdf" | "png">("pdf");
  const [open, setOpen] = useState(false);

  const takeScreenshot = async () => {
    // FIXING THE HEADER
    const input = document.getElementById("name") as HTMLInputElement;
    const inputValue = input.value;
    const editDate = document.querySelector(".editDate") as HTMLElement;
    if (editDate) {
      editDate.style.display = "block";
    }
    const outputLabel = document.querySelector(".output-label") as HTMLElement;
    outputLabel.style.transform = "translateY(-7px)";

    const channelCells =
      document.querySelectorAll<HTMLElement>(".channel-cell");

    channelCells.forEach((cell) => {
      cell.style.transform = "translateY(-6px)";
    });

    const span = document.createElement("span");
    span.textContent = inputValue;
    span.style.fontSize = "4rem";
    span.style.textAlign = "center";
    span.style.display = "flex";
    span.style.justifyContent = "center";
    span.style.alignItems = "center";
    span.style.width = "100%";
    span.style.height = "100%";
    span.style.fontFamily = "urbanist";
    span.style.transform = "translateY(-44px)";

    if (input.parentNode) {
      input.parentNode.replaceChild(span, input);
    }

    // NOW WE CONVERT THE FUCKING THIGN
    const element = document.querySelector(".mt-8");

    if (!element || !(element instanceof HTMLElement)) {
      console.error("Element with class '.mt-8' not found.");
      return;
    }
    try {
      const canvas = await html2canvas(element, {
        ignoreElements: (el) => el.classList.contains("ignore-me"),
      });

      const imgData = canvas.toDataURL("image/png");

      if (format === "pdf") {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const aspectRatio = canvasWidth / canvasHeight;

        let imgWidth = pageWidth;
        let imgHeight = pageWidth / aspectRatio;
        // const scaleFactor = 1;
        // imgWidth *= scaleFactor;
        // imgHeight *= scaleFactor;

        if (imgHeight > pageHeight) {
          imgHeight = pageHeight;
          imgWidth = pageHeight * aspectRatio;
        }
        const xPosition = (pageWidth - imgWidth) / 2;
        const yPosition = 0;
        doc.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

        doc.save(`${bandName.replace(/\s+/g, "-")}.pdf`);
      } else if (format === "png") {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${bandName.replace(/\s+/g, "-")}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      // UNDO THE THINGS WE DID
      const spanParent = span.parentNode;
      if (spanParent && spanParent instanceof HTMLElement) {
        spanParent.replaceChild(input, span);
      }
      channelCells.forEach((cell) => {
        cell.style.transform = "translateY(6px)";
      });
      outputLabel.style.transform = "translateY(2px)";

      editDate.style.display = "none";
      setOpen(false);
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          type="button"
          onClick={() => setOpen(true)}
          className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          Download Now
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">PDF Export Settings</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={format}
          onValueChange={(val) => setFormat(val as "pdf" | "png")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pdf" id="pdf" />
            <Label htmlFor="pdf">PDF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="png" id="png" />
            <Label htmlFor="png">PNG</Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button
            onClick={() => takeScreenshot()}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            {`Generate ${format.toUpperCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
