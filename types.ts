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

export interface StagePlotWithInputs extends StagePlot {
  inputs: Input[];
}

export interface GetPlotByIdResponse {
  result: StagePlot & { inputs: Input[] };
  error?: string;
}

export interface StageElementPosition {
  id: number;
  x: number;
  y: number;
  title: string;
  stage_plot_id: number;
  created_at: string | null;
}
