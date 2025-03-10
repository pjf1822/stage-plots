"use client";

import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import TableSection from "./TableSection";

const InputList = ({ handleRemoveInput }: { handleRemoveInput: any }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const is_stands_showing = watch("is_stands_showing");

  const { fields, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  const rowsPerColumn = 24;
  const firstColumn = fields.slice(0, rowsPerColumn); // First 15 rows
  const secondColumn = fields.slice(rowsPerColumn); // Remaining rows
  const hasSecondColumn = secondColumn.length > 0;
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-6">
      <div
        className={`w-full mb-6 grid ${
          hasSecondColumn ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        } gap-4`}
      >
        <div className={`w-full ${hasSecondColumn ? "" : "col-span-2"}`}>
          <TableSection
            fields={firstColumn}
            register={register}
            remove={remove}
            startIndex={0}
            is_stands_showing={is_stands_showing}
            handleRemoveInput={handleRemoveInput}
            hasSecondColumn={hasSecondColumn}
          />
        </div>

        {hasSecondColumn && (
          <div className="w-full">
            <TableSection
              fields={secondColumn}
              register={register}
              remove={remove}
              startIndex={rowsPerColumn}
              is_stands_showing={is_stands_showing}
              handleRemoveInput={handleRemoveInput}
              hasSecondColumn={hasSecondColumn}
            />
          </div>
        )}
      </div>
      <p className="editDate font-urbanist " style={{ display: "none" }}>
        Last edited {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default InputList;
