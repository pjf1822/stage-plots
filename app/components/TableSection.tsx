"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import Image from "next/image";
import { useState } from "react";

type TableSectionProps = {
  fields: any[];
  register: any;
  remove: (index: number) => void;
  startIndex: number;
  is_stands_showing: boolean;
  handleRemoveInput: any;
  totalWidth: number;
  visibleColumns: any;
  handleResize: any;
};

const standOptions = [
  "Tall Boom",
  "Short",
  "Straight Round Base",
  "Wireless",
  "Short Boom",
  "none",
  "",
];

const TableSection = ({
  fields,
  register,
  startIndex,
  is_stands_showing,
  handleRemoveInput,
  totalWidth,
  visibleColumns,
  handleResize,
}: TableSectionProps) => {
  return (
    <div>
      <Table
        className="overflow-hidden"
        style={{ maxWidth: `${totalWidth}px` }}
      >
        <TableHeader>
          <TableRow>
            {visibleColumns?.map((col, index) => (
              <TableHead
                key={index}
                className="border border-gray-400 text-black relative"
                style={{
                  width: col?.width,
                  maxWidth: index === 0 ? "80px" : undefined,
                }}
              >
                {col?.name}
                <span
                  className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startWidth = col?.width;

                    const handleMouseMove = (event: MouseEvent) => {
                      const newWidth = startWidth + (event.clientX - startX);
                      handleResize(index, newWidth);
                    };

                    const handleMouseUp = () => {
                      window.removeEventListener("mousemove", handleMouseMove);
                      window.removeEventListener("mouseup", handleMouseUp);
                    };

                    window.addEventListener("mousemove", handleMouseMove);
                    window.addEventListener("mouseup", handleMouseUp);
                  }}
                ></span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => {
            return (
              <TableRow className="border-0" key={item.id}>
                <TableCell className="p-0 text-center border border-gray-400 max-w-[10px] w-[10px]">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${startIndex + index}.name`, {
                      required: "Input name is required",
                    })}
                    placeholder={`Input ${startIndex + index + 1}`}
                    className="py-0 px-2  rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 relative ">
                  <Input
                    {...register(`inputs.${startIndex + index}.mic`)}
                    placeholder="Mic/DI"
                    className="py-0 px-2 rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                  />
                  {!is_stands_showing && (
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
                        type="button"
                        size="sm"
                        onClick={() => handleRemoveInput(item.channel)} // Pass channel instead of index
                        className="p-1 hover:bg-transparent focus:outline-none"
                      >
                        <Image
                          src={"/x.svg"}
                          alt={"x"}
                          width={10}
                          height={10}
                        />
                      </Button>
                    </div>
                  )}
                </TableCell>
                {is_stands_showing && (
                  <TableCell className="p-0 border border-gray-400 pl-2 relative">
                    <select
                      {...register(`inputs.${startIndex + index}.stand`)}
                      className="p-2 rounded-md w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-transparent"
                    >
                      {standOptions.map((stand, idx) => (
                        <option key={idx} value={stand}>
                          {stand}
                        </option>
                      ))}
                    </select>

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
                        onClick={() => handleRemoveInput(item.channel)}
                        className="p-1 hover:bg-transparent focus:outline-none"
                      >
                        <Image
                          src={"/x.svg"}
                          alt={"x"}
                          width={10}
                          height={10}
                        />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSection;
