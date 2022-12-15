import { InputHTMLAttributes, ReactNode } from "react";

import { InputPassword, InputSearch, InputSkeleton } from "./components";

export interface InputComponents {
  Password: typeof InputPassword;
  Search: typeof InputSearch;
  Skeleton: typeof InputSkeleton;
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
