import { InputHTMLAttributes, ReactNode } from "react";

import { InputPassword, InputSearch, InputSkeleton } from "./components";
import { InputTags } from "./components/InputTags";

export interface InputComponents {
  Password: typeof InputPassword;
  Search: typeof InputSearch;
  Skeleton: typeof InputSkeleton;
  Tags: typeof InputTags;
}

export interface InputProperties {
  /**
   * Change the visual style of the input.
   * @default neutral
   */
  appearance?: "neutral" | "success" | "warning" | "danger";
  /**
   * Disables the input, disallowing user interaction.
   */
  disabled?: boolean;
  /**
   * Sent icon display position
   * @default start
   */
  appendPosition?: "end" | "start";
  /**
   * SVG icon to be displayed on input.
   * @TJS-type React.ReactNode
   */
  append?: ReactNode;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
}

export type InputBaseProps = InputProperties &
  InputHTMLAttributes<HTMLInputElement>;
