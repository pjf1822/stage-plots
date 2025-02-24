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

const standOptions = [
  "Tall Boom",
  "Short",
  "Tall Round Base",
  "Short Boom",
  "Wireless",
];

const TableSection = ({
  fields,
  register,
  remove,
  startIndex,
  is_stands_showing,
}: TableSectionProps) => {
  console.log(fields);
  const sortedFields = [...fields].sort((a, b) => a.channel - b.channel); // Ascending order (smallest to largest)
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
          {sortedFields.map((item, index) => (
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
                    style={{ position: "absolute", top: "-3px", right: "-2px" }}
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
