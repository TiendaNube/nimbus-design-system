import { HTMLAttributes, ReactNode } from "react";
import { box } from "@nimbus-ds/styles";

export type BoxSprinkle = Parameters<typeof box.sprinkle>[0];

type Extends = BoxSprinkle & HTMLAttributes<HTMLDivElement>;

export interface BoxProps extends Extends {
  /** Element to be rendered inside the Box component */
  children?: ReactNode;
}
