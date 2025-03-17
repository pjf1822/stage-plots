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
  hasSecondColumn: any;
};

type Column = {
  key: "channel" | "inputName" | "mic" | "stand";
  name: string;
  width: number;
  isResizable?: boolean;
  isVisible?: boolean;
};

const TableSection = ({
  fields,
  register,
  startIndex,
  is_stands_showing,
  handleRemoveInput,
  hasSecondColumn,
}: TableSectionProps) => {
  const [columnWidths, setColumnWidths] = useState({
    channel: 100,
    inputName: 200,
    mic: 150,
    stand: 150,
  });
  const columns: Column[] = [
    { key: "channel", name: "Channel", width: 20, isResizable: false },
    { key: "inputName", name: "Input Name", width: 200 },
    { key: "mic", name: "Mic", width: 150 },
    { key: "stand", name: "Stand", width: 150, isVisible: is_stands_showing },
  ];
  const handleResize = (key: string, newWidth: number) => {
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [key]: Math.max(newWidth, 40), // Ensure a minimum width of 50px
    }));
  };

  const preventEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div style={{ transform: "scale(1.02)", transformOrigin: "top left" }}>
      <Table
        className="overflow-hidden"
        style={{ maxWidth: hasSecondColumn ? "100%" : "75%" }}
      >
        <TableHeader>
          <TableRow>
            {columns.map((col) => {
              if (col.key === "stand" && !is_stands_showing) {
                return null; // Skip the "Stand" column if is_stands_showing is false
              }
              return (
                <TableHead
                  key={col.key}
                  className="border border-gray-400 text-black relative"
                  style={{ width: columnWidths[col.key] }} // Use column width or fixed width
                >
                  {col.name}
                  {col.isResizable !== false && ( // Only apply resize handle for resizable columns
                    <span
                      className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                      onMouseDown={(e) => {
                        const startX = e.clientX;
                        const startWidth = columnWidths[col.key] || col.width;

                        const handleMouseMove = (event: MouseEvent) => {
                          const newWidth =
                            startWidth + (event.clientX - startX);
                          handleResize(col.key, newWidth);
                        };

                        const handleMouseUp = () => {
                          window.removeEventListener(
                            "mousemove",
                            handleMouseMove
                          );
                          window.removeEventListener("mouseup", handleMouseUp);
                        };

                        window.addEventListener("mousemove", handleMouseMove);
                        window.addEventListener("mouseup", handleMouseUp);
                      }}
                    ></span>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => {
            return (
              <TableRow className="border-0" key={item.id}>
                <TableCell className="p-0 text-center border border-gray-400 max-w-[10px] w-[10px]">
                  <div className="channel-cell"> {startIndex + index + 1}</div>
                </TableCell>
                <TableCell className="p-0 border border-gray-400 ">
                  <Input
                    {...register(`inputs.${startIndex + index}.name`, {
                      required: "Input name is required",
                    })}
                    style={{ fontSize: 17 }}
                    onKeyDown={preventEnterSubmit}
                    placeholder=""
                    className="py-0 px-2   rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400 "
                  />
                </TableCell>
                <TableCell className="p-0 border border-gray-400 relative ">
                  <Input
                    onKeyDown={preventEnterSubmit}
                    {...register(`inputs.${startIndex + index}.mic`)}
                    placeholder=""
                    style={{ fontSize: 17 }}
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
                        onClick={() => handleRemoveInput(item.channel)}
                        className="p-1 hover:bg-transparent focus:outline-none ignore-me"
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
                    <Input
                      onKeyDown={preventEnterSubmit}
                      {...register(`inputs.${startIndex + index}.stand`)}
                      placeholder=""
                      style={{ fontSize: 17 }}
                      className="py-0 px-2  rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400 "
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
                        onClick={() => handleRemoveInput(item.channel)}
                        className="p-1 hover:bg-transparent focus:outline-none ignore-me"
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
