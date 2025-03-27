"use client";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import TableSection from "./TableSection";
import OutputTableSection from "./OutputTableSection";
import DescriptionForm from "./DescriptionForm";

const InputList = ({
  handleRemoveInput,
  handleRemoveOutput,
}: {
  handleRemoveInput: any;
  handleRemoveOutput: any;
}) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const is_stands_showing = watch("is_stands_showing");
  const is_outputs_showing = watch("is_outputs_showing");

  const { fields, remove } = useFieldArray({
    control,
    name: "inputs",
  });
  const { fields: outputs } = useFieldArray({
    control,
    name: "outputs",
  });

  const rowsPerColumn = 24;
  const firstColumn = fields.slice(0, rowsPerColumn); // First 15 rows
  const secondColumn = fields.slice(rowsPerColumn); // Remaining rows
  const hasSecondColumn = secondColumn.length > 0;

  const columnCount =
    1 + (is_outputs_showing ? 1 : 0) + (hasSecondColumn ? 1 : 0);
  let gridColsClass = "grid-cols-1";
  if (columnCount === 2) {
    gridColsClass = "grid-cols-2";
  } else if (columnCount === 3) {
    gridColsClass = "grid-cols-3";
  }
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-6 ">
      <div className={`w-full mb-6 grid ${gridColsClass}  gap-4`}>
        <div className={`w-full `}>
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

        {is_outputs_showing && (
          <div className="relative max-w-lg">
            <h2
              className="absolute left-2 output-label"
              style={{ top: -24, fontFamily: "urbanist" }}
            >
              Outputs
            </h2>
            <OutputTableSection
              outputs={outputs}
              register={register}
              handleRemoveOutput={handleRemoveOutput}
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
