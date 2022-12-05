import { TextareaHTMLAttributes } from "react";
// import { textarea } from "@nimbus-ds/styles";
import { Skeleton } from "./components";

export interface TextareaComponents {
  Skeleton: typeof Skeleton;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Element to be rendered inside the Textarea component */
  appearance?: "neutral" | "success" | "warning" | "danger";
  /** Number of lines to be rendered for the user to input text */
  lines?: number;
  /** ID of the textarea element */
  id: string;
}
