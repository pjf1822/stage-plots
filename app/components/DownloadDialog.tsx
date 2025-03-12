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

const DownloadDialog = ({ bandName, zoom: any }) => {
  const [format, setFormat] = useState<"pdf" | "png">("pdf");
  const [open, setOpen] = useState(false);

  const takeScreenshot = async () => {
    const input = document.getElementById("name") as HTMLInputElement;
    const inputValue = input.value;
    const editDate = document.querySelector(".editDate") as HTMLElement;
    if (editDate) {
      editDate.style.display = "block";
    }

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
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFillColor(243, 244, 246);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const aspectRatio = canvasWidth / canvasHeight;

      let imgWidth = pageWidth;
      let imgHeight = pageWidth / aspectRatio;
      const scaleFactor = 1 / zoom;
      imgWidth *= scaleFactor;
      imgHeight *= scaleFactor;

      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = pageHeight * aspectRatio;
      }
      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 0;

      if (format === "pdf") {
        doc.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

        doc.save(`${bandName.replace(/\s+/g, "-")}.pdf`);
      } else if (format === "png") {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${bandName.replace(/\s+/g, "-")}.png`;
        link.click();
        console.log("Screenshot captured and download initiated");
      }
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      const spanParent = span.parentNode;
      if (spanParent && spanParent instanceof HTMLElement) {
        spanParent.replaceChild(input, span);
      }
      editDate.style.display = "none";
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          type="button"
          onClick={() => setOpen(true)}
          className="font-urbanist bg-black text-lg px-6 py-6 rounded-lg text-white shadow-xl transform transition-all hover:scale-105"
        >
          Convert to PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">PDF Export Settings</DialogTitle>
        </DialogHeader>
        <RadioGroup
          defaultValue="pdf"
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
            Generate PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
