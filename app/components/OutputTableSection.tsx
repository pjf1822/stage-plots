"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Output } from "@/types";

type OutputTableSectionProps = {
  outputs: any;
  register: any;
  handleRemoveOutput: (channel: number) => void;
};
const OutputTableSection: React.FC<OutputTableSectionProps> = ({
  outputs,
  register,
  handleRemoveOutput,
}) => {
  type Column = {
    key: "channel" | "title";
    name: string;
  };

  const columns: Column[] = [
    { key: "channel", name: "Channel" },
    { key: "title", name: "Output" },
  ];
  const preventEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div style={{ transform: "scale(1.02)", transformOrigin: "top left" }}>
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="border border-gray-400 text-black relative"
              >
                {col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {outputs.map((item: any, index: any) => (
            <TableRow className="border-0" key={item.id}>
              <TableCell className="p-0 text-center border border-gray-400 max-w-[10px] w-[10px]">
                <div className="channel-cell">{index + 1}</div>
              </TableCell>
              <TableCell className="p-0 border border-gray-400 relative">
                <Input
                  {...register(`outputs.${index}.title`, {
                    required: "Output title is required",
                  })}
                  style={{ fontSize: 17 }}
                  placeholder=""
                  onKeyDown={preventEnterSubmit}
                  className="py-0 px-2 rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                />
                <div
                  className="p-1"
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-2px",
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOutput(item.channel)}
                    className="p-1 hover:bg-transparent focus:outline-none ignore-me"
                  >
                    <Image src={"/x.svg"} alt={"x"} width={10} height={10} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OutputTableSection;
