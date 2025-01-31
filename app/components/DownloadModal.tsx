import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface DownloadModalProps {
  image: string | null; // Image is either a string (base64 URL) or null
  downloadImage: () => void; // Function to trigger the image download
}
const DownloadModal: React.FC<DownloadModalProps> = ({
  image,
  downloadImage,
}) => {
  return (
    <DialogContent className="p-0">
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      {image && (
        <div className="mt-4 flex flex-col items-center">
          <img src={image} alt="Screenshot of the form" className="mb-4" />
          <Button onClick={downloadImage} className="mx-auto block mb-1">
            Download Image
          </Button>
        </div>
      )}
    </DialogContent>
  );
};

export default DownloadModal;
