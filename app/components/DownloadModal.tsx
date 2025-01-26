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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
      </DialogHeader>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Screenshot of the form" />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </DialogContent>
  );
};

export default DownloadModal;
