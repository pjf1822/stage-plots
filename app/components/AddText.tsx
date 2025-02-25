"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface AddTextProps {
  stagePlotId: string;
  setStageElements: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddText: React.FC<AddTextProps> = ({ stagePlotId, setStageElements }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleAddLabel = () => {
    const newLabel = {
      id: uuidv4(),
      x: 50,
      y: 50,
      title: "",
      stage_plot_id: stagePlotId,
      scale: 1.0,
      label: text,
      rotate: 0,
    };

    setStageElements((prevElements) => [...prevElements, newLabel]); // add the new label to the stage elements
    setText(""); // clear the input field
  };
  return (
    <div className="absolute top-2 right-2 flex flex-col justify-right">
      <Input
        value={text}
        onChange={handleInputChange}
        placeholder="Enter label text"
        className="mb-2 border-2 border-black rounded-lg focus:border-black focus:ring-black font-urbanist"
      />
      <Button className="font-urbanist" onClick={handleAddLabel} type="button">
        Add Label
      </Button>
    </div>
  );
};

export default AddText;
