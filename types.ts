import { z } from "zod";

export interface StagePlot {
  id: string;
  name: string;
  description: string;
  created_by: string;
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
export interface StageElement {
  id: string;
  x: number | null;
  y: number | null;
  title: string;
  stage_plot_id: string;
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
  name: z.string(),
  description: z.string(),
  id: z.string(),
  created_by: z.string(),
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
  stage_elements: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        x: z.number(),
        y: z.number(),
        stage_plot_id: z.string(),
      })
    )
    .default([]),
});

export type StagePlotFormData = z.infer<typeof stagePlotSchema>;
