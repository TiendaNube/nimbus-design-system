import { HTMLAttributes, ReactNode } from "react";
import { StackSprinkle, stack } from "@nimbus-ds/styles";

type Extends = Parameters<typeof stack.sprinkle>[0] &
  StackSprinkle &
  HTMLAttributes<HTMLDivElement>;

export interface StackProps extends Extends {
  /** Element to be rendered inside the Stack component */
  children?: ReactNode;
}
