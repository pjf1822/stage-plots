"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const InputList = ({ stagePlotId }: { stagePlotId: string }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  const handleAddInput = () => {
    const nextChannel = fields.length + 1;

    append({
      id: uuidv4(),
      name: "",
      channel: nextChannel,
      mic: "",
      stand: "",
      notes: "",
      stage_plot_id: stagePlotId,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Input List</h2>
      <div className="overflow-x-auto w-full mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Channel</TableHead>
              <TableHead>Input Name</TableHead>
              <TableHead>Mic Type</TableHead>
              <TableHead>Stand</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center border border-gray-400 ">
                  {index + 1}
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.name`, {
                      required: "Input name is required",
                    })}
                    placeholder={`Input ${index + 1}`}
                    className="p-2 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.mic`)}
                    placeholder="Mic/DI"
                    className="p-2 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.stand`)}
                    placeholder="Stand"
                    className="p-2 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Textarea
                    {...register(`inputs.${index}.notes`)}
                    placeholder="Notes"
                    className="p-2 rounded-md w-full border-none shadow-none focus-visible:ring-0 resize-none"
                    rows={1}
                  />
                </TableCell>
                <TableCell className="flex items-center justify-center border-none  border-gray-400 ">
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={handleAddInput}
      >
        Add input
      </Button>
    </div>
  );
};

export default InputList;
