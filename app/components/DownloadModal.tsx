import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const DownloadModal = ({ image, downloadImage }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        {image && (
          <div className="mt-4">
            <img src={image} alt="Screenshot of the form" />
            <button onClick={downloadImage}>Download Image</button>
          </div>
        )}
      </DialogHeader>
    </DialogContent>
  );
};

export default DownloadModal;
