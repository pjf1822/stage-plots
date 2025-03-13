import { z } from "zod";

export interface StagePlot {
  id: string;
  name: string;
  description: string;
  created_by: string;
  is_stands_showing: boolean;
  is_outputs_showing: boolean;
}
export interface Input {
  id: string;
  name: string;
  channel: number | null;
  mic: string;
  stand: string;
  notes: string;
  stage_plot_id: string;
}
export interface Output {
  id: string;
  title: string;
  channel: number | null;
  stage_plot_id: string;
}
export interface StageElement {
  id: string;
  x: number | null;
  y: number | null;
  title: string;
  stage_plot_id: string;
  scale: number;
  label: string;
  rotate: number;
}

export interface FullStagePlot extends StagePlot {
  inputs: Input[];
  outputs: Output[];
  stage_elements: StageElement[];
}

export interface GetPlotByIdResponse {
  result: StagePlot & { inputs: Input[] };
  error?: string;
}

export const stagePlotSchema = z.object({
  name: z.string(),
  description: z.string(),
  id: z.string(),
  created_by: z.string(),
  is_stands_showing: z.boolean(),
  is_outputs_showing: z.boolean(),
  inputs: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        channel: z.number().nullable(),
        mic: z.string(),
        stand: z.string(),
        notes: z.string(),
        stage_plot_id: z.string(),
      })
    )
    .default([]),
  outputs: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        channel: z.number().nullable(),
        stage_plot_id: z.string(),
      })
    )
    .default([]),
  stage_elements: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        x: z.number(),
        y: z.number(),
        stage_plot_id: z.string(),
        scale: z.number(),
        label: z.string(),
        rotate: z.number(),
      })
    )
    .default([]),
});

export type StagePlotFormData = z.infer<typeof stagePlotSchema>;
