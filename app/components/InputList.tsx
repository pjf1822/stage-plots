"use client";

import React, { useState } from "react";
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

  const [columns, setColumns] = useState([
    { key: "channel", name: "Channel", width: 80 },
    { key: "input", name: "Input Name", width: 400 },
    { key: "mic", name: "Mic", width: 250 },
    { key: "stand", name: "Stand", width: 250, conditional: true },
  ]);

  const handleResize = (index: number, newWidth: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((col, i) =>
        i === index ? { ...col, width: Math.max(newWidth, 50) } : col
      )
    );
  };
  const visibleColumns = columns.filter(
    (col) => !col.conditional || (col.conditional && is_stands_showing)
  );

  const totalWidth = visibleColumns.reduce((sum, col) => sum + col.width, 0);

  const { fields, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  const rowsPerColumn = 24;
  const firstColumn = fields.slice(0, rowsPerColumn);
  const secondColumn = fields.slice(rowsPerColumn);
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
            totalWidth={totalWidth}
            visibleColumns={visibleColumns}
            handleResize={handleResize}
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
              totalWidth={totalWidth}
              visibleColumns={visibleColumns}
              handleResize={handleResize}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputList;
