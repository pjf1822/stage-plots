"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
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
            <TableRow style={{ borderBottomWidth: 0 }}>
              <TableHead className="w-[100px]">Channel</TableHead>
              <TableHead>Input Name</TableHead>
              <TableHead>Mic Type</TableHead>
              <TableHead>Stand</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((item, index) => (
              <TableRow className="border-0" key={item.id}>
                <TableCell className="p-0 text-center border border-gray-400 ">
                  {index + 1}
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.name`, {
                      required: "Input name is required",
                    })}
                    placeholder={`Input ${index + 1}`}
                    className="p-0 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.mic`)}
                    placeholder="Mic/DI"
                    className="p-0 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${index}.stand`)}
                    placeholder="Stand"
                    className="p-0 rounded-md w-full border-none shadow-none focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Textarea
                    {...register(`inputs.${index}.notes`)}
                    placeholder="Notes"
                    className="p-0 rounded-md w-full border-none shadow-none focus-visible:ring-0 resize-none"
                    rows={1}
                  />
                </TableCell>
                <TableCell className="p-0 flex items-center justify-center border-none  border-gray-400 ">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    x
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
        size="sm"
        onClick={handleAddInput}
      >
        Add Input
      </Button>
    </div>
  );
};

export default InputList;
