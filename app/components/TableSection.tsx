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
  is_stands_showing: boolean;
};

const TableSection = ({
  fields,
  register,
  remove,
  startIndex,
  is_stands_showing,
}: TableSectionProps) => {
  return (
    <div>
      <Table className="overflow-visible">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] border border-gray-400   text-black">
              Channel
            </TableHead>
            <TableHead className=" border border-gray-400  text-black">
              Input Name
            </TableHead>
            <TableHead className=" border border-gray-400  text-black">
              Mic
            </TableHead>
            {is_stands_showing && (
              <TableHead className="border border-gray-400 text-black">
                Stand
              </TableHead>
            )}
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
                    style={{ position: "absolute", top: "-8px", right: "-2px" }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(startIndex + index)}
                      className="p-1 hover:bg-transparent focus:outline-none"
                    >
                      <Image src={"/x.svg"} alt={"x"} width={10} height={10} />
                    </Button>
                  </div>
                )}
              </TableCell>
              {is_stands_showing && (
                <TableCell className="p-0 border border-gray-400 pl-2 relative">
                  <Input
                    {...register(`inputs.${startIndex + index}.stand`)}
                    placeholder="Stand"
                    className="p-0 rounded-md w-full border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                  />
                  <div
                    className="p-1"
                    style={{ position: "absolute", top: "-8px", right: "-2px" }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(startIndex + index)}
                      className="p-1 hover:bg-transparent focus:outline-none"
                    >
                      <Image src={"/x.svg"} alt={"x"} width={10} height={10} />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSection;
