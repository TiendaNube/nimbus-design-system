import { ReactNode, SelectHTMLAttributes } from "react";
import { Group, Option, Skeleton } from "./components";

export interface SelectComponents {
  Group: typeof Group;
  Option: typeof Option;
  Skeleton: typeof Skeleton;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Select name */
  name: string;
  /** Select id */
  id: string;
  /** Elements to be rendered inside the select list */
  children: ReactNode;
}
