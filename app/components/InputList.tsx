"use client";
import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";

const InputList = () => {
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
