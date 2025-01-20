"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const InputList = ({
  inputs,
}: {
  inputs: { name: string; type: string }[];
}) => {
  const {
    control,
    register,
    formState: { errors },
    setValue, // to set values for initial inputs
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  });
  React.useEffect(() => {
    if (inputs && inputs.length) {
      inputs.forEach((input, index) => {
        setValue(`inputs.${index}.name`, input.name);
        setValue(`inputs.${index}.type`, input.type);
      });
    }
  }, [inputs, setValue]);

  return (
    <div>
      <label>Input List (Microphones, DIs, Channels, etc.):</label>
      {fields.map((item, index) => (
        <div key={item.id} className="input-row">
          <input
            {...register(`inputs.${index}.name`, {
              required: "input name is required",
            })}
            placeholder={`input ${index + 1}`}
          />
          {errors.inputs?.[index]?.name && (
            <p className="error">{errors.inputs[index].name?.message}</p>
          )}

          {/* Additional fields can be added here, like type or quantity */}
          <input
            {...register(`inputs.${index}.type`)}
            placeholder="Type (e.g., Mic, DI)"
          />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", type: "" })}>
        Add input
      </button>
    </div>
  );
};

export default InputList;
