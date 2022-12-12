import { InputHTMLAttributes, ReactNode } from "react";

import { Password, Search, Skeleton } from "./components";

export interface InputComponents {
  Password: typeof Password;
  Search: typeof Search;
  Skeleton: typeof Skeleton;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input appearance */
  appearance?: "neutral" | "success" | "warning" | "danger";
  /** Input disabled */
  disabled?: boolean;
  /** Input append position icon */
  appendPosition?: "end" | "start";
  /** Input append icon */
  append?: ReactNode;
}
