import { ReactNode, SelectHTMLAttributes } from "react";
import { SelectGroup, SelectOption, SelectSkeleton } from "./components";

export interface SelectComponents {
  Group: typeof SelectGroup;
  Option: typeof SelectOption;
  Skeleton: typeof SelectSkeleton;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Select name */
  name: string;
  /** Select id */
  id: string;
  /** Elements to be rendered inside the select list */
  children: ReactNode;
  /** Select color */
  appearance?: "success" | "warning" | "danger" | "neutral";
}
