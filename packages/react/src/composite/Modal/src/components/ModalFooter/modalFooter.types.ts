import { HTMLAttributes, ReactNode } from "react";

export interface ModalFooterProperties {
  /**
   * The content of the modal footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type ModalFooterProps = ModalFooterProperties &
  HTMLAttributes<HTMLElement>;
