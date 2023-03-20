import { HTMLAttributes, ReactNode } from "react";
import { card } from "@nimbus-ds/styles";

export interface ModalBodyProperties {
  /**
   * The content of the modal body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an modal's body content area.
   * @default base
   */
  padding?: keyof typeof card.properties.padding;
}

export type ModalBodyProps = ModalBodyProperties & HTMLAttributes<HTMLElement>;
