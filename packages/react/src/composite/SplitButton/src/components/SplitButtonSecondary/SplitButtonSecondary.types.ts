import type { ReactNode, ButtonHTMLAttributes } from "react";

export interface SplitButtonSecondaryProperties {
  /**
   * The content of the secondary dropdown menu.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Accessible label for the dropdown button.
   * @default "Show more actions"
   */
  ariaLabel?: string;
}

export type SplitButtonSecondaryProps = SplitButtonSecondaryProperties &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;
