import { InputHTMLAttributes, ReactNode } from "react";

import { InputPassword, InputSearch, InputSkeleton } from "./components";

export interface InputComponents {
  Password: typeof InputPassword;
  Search: typeof InputSearch;
  Skeleton: typeof InputSkeleton;
}

export interface InputProperties {
  /**
   * Change the visual style of the input.
   * @default neutral
   * - "ai-gradient": Applies an AI-themed gradient border style
   */
  appearance?: "neutral" | "success" | "warning" | "danger" | "ai-gradient";
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
