import { Input } from "@/types";
import { createClient } from "./supabase/server";

export const updateInputList = async (
  inputs: Pick<Input, "name" | "type" | "id">[],
  stagePlotId: number
) => {
  const supabase = await createClient();

  const inputListData = inputs.map((input) => {
    const data: Partial<Input> = {
      stage_plot_id: stagePlotId,
      name: input.name,
      type: input.type || "",
    };

    if (input.id) {
      data.id = input.id;
    }

    return data;
  });
  const { error: inputError } = await supabase
    .from("inputs")
    .upsert(inputListData); // Use 'id' as the unique conflict key

  if (inputError) {
    throw new Error(`Failed to add/update inputs: ${inputError.message}`);
  }

  return "Inputs processed successfully";
};
