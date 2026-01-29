import { type HTMLAttributes, type ReactNode } from "react";
import { type modal } from "@nimbus-ds/styles";

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
  /**
   * The tag to display next to the title.
   * @TJS-type React.ReactNode
   */
  tag?: ReactNode;
  /**
   * The padding properties are used to generate space around an modal's header content area.
   * @default none
   */
  padding?: keyof typeof modal.subComponents.header.properties.padding;
}

export type ModalHeaderProps = ModalHeaderProperties &
  HTMLAttributes<HTMLElement>;
