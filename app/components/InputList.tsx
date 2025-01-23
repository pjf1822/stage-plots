"use client";
import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <div className="flex flex-col items-center justify-center w-full  mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Input List (Microphones, DIs, Channels, etc.):
      </h2>
      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full table-auto border-collapse border border-black">
          <thead>
            <tr>
              <th className="px-1  text-left bg-gray-200">Channel</th>
              <th className="px-1  text-left bg-gray-200">Input Name</th>
              <th className="px-1  text-left bg-gray-200">Mic Type</th>
              <th className="px-1  text-left bg-gray-200">Stand</th>
              <th className="px-1  text-left bg-gray-200">Notes</th>
              <th className="px-1  text-left bg-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id} className="border-b border-black">
                <td className="px-1  border-l border-r border-black">
                  <input
                    type="number"
                    {...register(`inputs.${index}.channel`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Channel"
                    className="p-2  rounded-md w-full"
                  />
                </td>
                <td className="px-1  border-l border-r border-black">
                  <input
                    {...register(`inputs.${index}.name`, {
                      required: "Input name is required",
                    })}
                    placeholder={`Input ${index + 1}`}
                    className="p-2  rounded-md w-full"
                  />
                </td>

                <td className="px-1  border-l border-r border-black">
                  <input
                    {...register(`inputs.${index}.mic`)}
                    placeholder="Mic/DI"
                    className="p-2  rounded-md w-full"
                  />
                </td>

                <td className="px-1  border-l border-r border-black">
                  <input
                    {...register(`inputs.${index}.stand`)}
                    placeholder="Stand"
                    className="p-2  rounded-md w-full"
                  />
                </td>

                <td className="px-1  border-l border-r border-black">
                  <textarea
                    {...register(`inputs.${index}.notes`)}
                    placeholder="Notes"
                    className="p-2  rounded-md w-full resize-none min-h-[60px]"
                  />
                </td>

                <td className="px-1">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white py-1 px-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            id: uuidv4(),
            name: "",
            channel: null,
            mic: "",
            stand: "",
            notes: "",
            stage_plot_id: stagePlotId,
          })
        }
        className="bg-green-500 text-white p-4 rounded-md font-semibold hover:bg-green-600 mt-6"
      >
        Add Input
      </button>
    </div>
  );
};

export default InputList;
