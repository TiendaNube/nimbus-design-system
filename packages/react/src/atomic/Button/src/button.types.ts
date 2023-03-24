import { ReactNode, ButtonHTMLAttributes } from "react";
import { ButtonSkeleton } from "./components";

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
  appearance?: "primary" | "danger" | "neutral" | "transparent";
  /**
   * Disables the button, disallowing user interaction.
   * @default false
   */
  disabled?: boolean;
}

export type ButtonBaseProps = ButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;
