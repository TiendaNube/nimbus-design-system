import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { type ButtonSkeleton } from "./components";

export interface ButtonComponents {
  Skeleton: typeof ButtonSkeleton;
}

export interface ButtonProperties {
  /**
   * The content of the button.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Change the visual style of the button.
   * @default neutral
   */
  appearance?:
    | "primary"
    | "danger"
    | "neutral"
    | "transparent"
    | "ai-primary"
    | "ai-secondary";
  /**
   * Disables the button, disallowing user interaction.
   * @default false
   */
  disabled?: boolean;
  /**
   * Determines if the button should grow to fill the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Change the size of the button.
   * @default medium
   */
  size?: "large" | "medium" | "small";
}

export type ButtonBaseProps = ButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;
