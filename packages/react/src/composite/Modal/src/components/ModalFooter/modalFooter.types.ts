import { HTMLAttributes, ReactNode } from "react";
import { modal } from "@nimbus-ds/styles";

export interface ModalFooterProperties {
  /**
   * The content of the modal footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an modal's footer content area.
   * @default none
   */
  padding?: keyof typeof modal.subComponents.footer.properties.padding;
}

export type ModalFooterProps = ModalFooterProperties &
  HTMLAttributes<HTMLElement>;
