import { type HTMLAttributes, type ReactNode } from "react";
import { type modal, type ModalSprinkle } from "@nimbus-ds/styles";
import { type CloseOnOutsidePress } from "@common/event-handling";
import {
  type ModalBody,
  type ModalFooter,
  type ModalHeader,
} from "./components";

export interface ModalComponents {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
}

export interface ModalProperties extends ModalSprinkle {
  /**
   * The content of the modal.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Whether the modal is open or not.
   */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed.
   * @TJS-type (open: boolean) => void;
   */
  onDismiss?: (open: boolean) => void;
  /**
   * Id to be embedded in the portal element
   */
  portalId?: string;
  /**
   * Controls whether clicking/pressing outside should close the modal.
   * - boolean: enable/disable dismissal on outside press
   * - function: receive the DOM event and return true to allow closing, false to ignore
   *
   * Defaults to true.
   */
  closeOnOutsidePress?: boolean | CloseOnOutsidePress;
  /**
   * The attribute name to ignore when checking for outside clicks. Useful to
   * mark regions (e.g., a chat) that should not close the modal when clicked.
   * @default "data-nimbus-outside-press-ignore"
   */
  ignoreAttributeName?: string;
  /**
   * The padding properties are used to generate space around an modal's content area.
   * @default base
   */
  padding?: keyof typeof modal.properties.padding;
}

export type ModalProps = ModalProperties & {
  /**
   * Root element where the portal should be mounted. When provided and not null,
   * the portal renders inside this element; when null/undefined, the default root is used.
   */
  root?: HTMLElement | null; // We create props for HTMLElement types
} & HTMLAttributes<HTMLDivElement>;
