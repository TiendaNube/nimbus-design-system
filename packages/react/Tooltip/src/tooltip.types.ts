import { HTMLAttributes, ReactNode } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Tooltip anchor */
  children: ReactNode;
  /** Text Label for the Tooltip */
  content: string;
  /** Position of the tooltip */
  position?: "top" | "bottom" | "left" | "right";
}
