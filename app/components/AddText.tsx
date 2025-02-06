"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface AddTextProps {
  append: any;
  stagePlotId: string;
}

const AddText: React.FC<AddTextProps> = ({ stagePlotId, append }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleAddLabel = () => {
    append({
      id: uuidv4(),
      x: 50,
      y: 50,
      title: "",
      stage_plot_id: stagePlotId,
      scale: 1.0,
      label: text,
    });
    setText("");
  };
  return (
    <div className="absolute top-2 right-2 flex flex-col justify-right">
      <Input
        value={text}
        onChange={handleInputChange}
        placeholder="Enter label text"
        className="mb-2"
      />
      <Button onClick={handleAddLabel}>Add Label</Button>
    </div>
  );
};

export default AddText;
