import { z } from "zod";

export interface StagePlot {
  created_at: string | null;
  created_by: string | null;
  description: string;
  id: number;
  name: string;
}
export interface Input {
  created_at: string | null;
  id: number;
  name: string;
  stage_plot_id: number | null;
  type: string;
}
export interface StageElement {
  id: number | string;
  x: number;
  y: number;
  title: string;
  stage_plot_id: number;
  created_at?: string | null;
}

export interface FullStagePlot extends StagePlot {
  inputs: Input[];
  stage_elements: StageElement[];
}

export interface GetPlotByIdResponse {
  result: StagePlot & { inputs: Input[] };
  error?: string;
}

export const stagePlotSchema = z.object({
  name: z.string().min(1, "Stage Plot Name is required"),
  description: z.string(),
  inputs: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Input name is required"),
        type: z.string().optional(),
      })
    )
    .default([]),
  stage_elements: z
    .array(
      z.object({
        id: z.union([z.number(), z.string()]), // id can be number or string
        title: z.string().min(1, "Stage element title is required"),
        x: z.number(),
        y: z.number(),
        stage_plot_id: z.number(),
      })
    )
    .default([]),
});

export type StagePlotFormData = z.infer<typeof stagePlotSchema>;
