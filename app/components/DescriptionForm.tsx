import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";

const DescriptionForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const { fields, remove } = useFieldArray({
    control,
    name: "description",
  });

  return (
    <div className="mt-1">
      <Textarea
        id="description"
        {...register("description")}
        placeholder="Add notes about this stage plot"
        className=" border-none bg-transparent focus:outline-none text-center resize-y"
        style={{ fontFamily: "urbanist", width: "100%", minHeight: 100 }}
      />
    </div>
  );
};

export default DescriptionForm;
