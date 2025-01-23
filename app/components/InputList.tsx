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
            {...register(`inputs.${index}.mic`)}
            placeholder="Type (e.g., Mic, DI)"
          />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
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
      >
        Add input
      </button>
    </div>
  );
};

export default InputList;
