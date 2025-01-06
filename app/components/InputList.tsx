"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const InputList = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputList",
  });
  return (
    <div>
      <label>Input List (Microphones, DIs, Channels, etc.):</label>
      {fields.map((item, index) => (
        <div key={item.id} className="input-row">
          <input
            {...register(`inputList.${index}.name`, {
              required: "input name is required",
            })}
            placeholder={`input ${index + 1}`}
          />
          {errors.inputList?.[index]?.name && (
            <p className="error">{errors.inputList[index].name?.message}</p>
          )}

          {/* Additional fields can be added here, like type or quantity */}
          <input
            {...register(`inputList.${index}.type`)}
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
