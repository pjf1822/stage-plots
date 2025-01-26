declare module "use-react-screenshot" {
  import React from "react";

  export function useScreenshot<T extends HTMLElement = HTMLElement>(options?: {
    type?: "image/png" | "image/jpeg";
    quality?: number;
  }): [string | null, (node: T | null) => void];
}
