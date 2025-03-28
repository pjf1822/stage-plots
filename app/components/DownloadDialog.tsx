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
import { takeScreenshot } from "@/utils/takeScreenShot";
import React, { useState } from "react";

const DownloadDialog = ({ bandName }: { bandName: string }) => {
  const [format, setFormat] = useState<"pdf" | "png">("pdf");
  const [isPortrait, setIsPortrait] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  const handleLandscapeChange = (val: string) => {
    setIsPortrait(val === "portrait");
    if (val === "landscape") {
      setFormat("pdf");
    }
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
      <DialogContent aria-describedby="export settings" className="bg-white">
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
            <RadioGroupItem value="png" id="png" disabled={!isPortrait} />
            <Label htmlFor="png">PNG</Label>
          </div>
        </RadioGroup>
        <RadioGroup
          value={isPortrait ? "portrait" : "landscape"}
          onValueChange={handleLandscapeChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="portrait" id="portrait" />
            <Label htmlFor="portrait">Portrait</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="landscape" id="landscape" />
            <Label htmlFor="landscape">Landscape</Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button
            onClick={() =>
              takeScreenshot(bandName, format, setOpen, isPortrait)
            }
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
