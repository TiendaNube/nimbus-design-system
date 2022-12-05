import { HTMLAttributes, ReactNode } from "react";
import { StackSprinkle } from "@nimbus-ds/styles";

type Extends = StackSprinkle & HTMLAttributes<HTMLDivElement>;

export interface StackProps extends Extends {
  /** Element to be rendered inside the Stack component */
  children?: ReactNode;
}
