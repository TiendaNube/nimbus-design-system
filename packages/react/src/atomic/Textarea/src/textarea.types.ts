import { TextareaHTMLAttributes } from "react";
import { TextareaSkeleton } from "./components";

export interface TextareaComponents {
  Skeleton: typeof TextareaSkeleton;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  appearance?: "neutral" | "success" | "warning" | "danger";
  /** Number of lines to be rendered for the user to input text */
  lines?: number;
  /** ID of the textarea element */
  id: string;
}
