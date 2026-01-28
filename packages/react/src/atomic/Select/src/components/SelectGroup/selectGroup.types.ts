import { type OptgroupHTMLAttributes, type ReactNode } from "react";

export interface SelectGroupProperties {
  /**
   * Label for the option group.
   */
  label: string;
  /**
   * The content of the option group.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type SelectGroupProps = SelectGroupProperties &
  OptgroupHTMLAttributes<HTMLOptGroupElement>;
