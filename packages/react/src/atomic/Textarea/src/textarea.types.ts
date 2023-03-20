import { TextareaHTMLAttributes } from "react";
import { TextareaSkeleton } from "./components";

export interface TextareaComponents {
  Skeleton: typeof TextareaSkeleton;
}

export interface TextareaProperties {
  /**
   * Change the visual style of the textarea.
   * @default neutral
   */
  appearance?: "neutral" | "success" | "warning" | "danger";
  /**
   * Number of lines to be rendered for the user to input text
   * @default 2
   */
  lines?: number;
  /**
   * ID of the textarea
   * */
  id: string;
}

export type TextareaProps = TextareaProperties &
  TextareaHTMLAttributes<HTMLTextAreaElement>;
