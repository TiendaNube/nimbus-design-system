import type { ReactNode, ButtonHTMLAttributes } from "react";

export interface SplitButtonPrimaryProperties {
  /**
   * The content of the primary button.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Callback function when the primary button is clicked.
   * @TJS-type () => void;
   */
  onClick?: () => void;
}

export type SplitButtonPrimaryProps = SplitButtonPrimaryProperties &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">;
