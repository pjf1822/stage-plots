// TableSection.tsx
import React from "react";
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

type TableSectionProps = {
  fields: any[];
  register: any;
  remove: (index: number) => void;
  startIndex: number;
};

const TableSection = ({
  fields,
  register,
  remove,
  startIndex,
}: TableSectionProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow style={{ borderBottomWidth: 0 }}>
          <TableHead className="w-[100px]">Channel</TableHead>
          <TableHead>Input Name</TableHead>
          <TableHead>Mic Type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((item, index) => (
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
                className="py-0 px-2  rounded-md w-full border-none shadow-none focus-visible:ring-0"
              />
            </TableCell>
            <TableCell className="p-0 border border-gray-400 ">
              <Input
                {...register(`inputs.${startIndex + index}.mic`)}
                placeholder="Mic/DI"
                className="py-0 px-2 rounded-md w-full border-none shadow-none focus-visible:ring-0"
              />
            </TableCell>
            {/* <TableCell className="p-0 border border-gray-400 ">
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
                  </TableCell> */}
            <TableCell className="p-0 flex items-center justify-center border-none  border-gray-400 ">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(startIndex + index)}
              >
                <Image src={"/x.svg"} alt={"x"} width={10} height={10} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSection;
