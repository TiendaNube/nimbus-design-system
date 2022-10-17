import { HTMLAttributes, ReactNode } from "react";
import { stack } from "@nimbus-ds/styles";

export type StackSprinkle = Parameters<typeof stack.sprinkle>[0];

type Extends = StackSprinkle & HTMLAttributes<HTMLDivElement>;

export interface StackProps extends Extends {
  /** Element to be rendered inside the Stack component */
  children?: ReactNode;
}
