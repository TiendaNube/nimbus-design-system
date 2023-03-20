import { HTMLAttributes, ReactNode } from "react";

export interface ModalHeaderProperties {
  /**
   * The content of the modal header.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * The title to display in the modal header.
   */
  title?: string;
}

export type ModalHeaderProps = ModalHeaderProperties &
  HTMLAttributes<HTMLElement>;
