import { type ReactNode } from "react";

export interface StepperCardProperties {
  /**
   * The content to be rendered inside the card container
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type StepperCardProps = StepperCardProperties;
