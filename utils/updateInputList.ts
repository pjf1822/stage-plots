import { createClient } from "./supabase/server";

export const updateInputList = async (
  inputs: { name: string; type: string; id: number }[],
  stagePlotId: number
) => {
  const supabase = await createClient();

  const inputListData = inputs.map((input) => {
    const data: any = {
      stage_plot_id: stagePlotId,
      name: input.name,
      type: input.type || "",
    };

    // Only add the id field if it exists (for existing inputs)
    if (input.id) {
      data.id = input.id;
    }

    return data;
  });
  console.log(inputListData, "what the fukc");
  // Insert or update inputs
  const { error: inputError } = await supabase
    .from("inputs")
    .upsert(inputListData); // Use 'id' as the unique conflict key

  if (inputError) {
    throw new Error(`Failed to add/update inputs: ${inputError.message}`);
  }

  return "Inputs processed successfully";
};
