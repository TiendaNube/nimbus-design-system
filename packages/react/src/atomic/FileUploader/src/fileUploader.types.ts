import { InputHTMLAttributes, DragEvent, ReactNode, ReactElement } from "react";
import { fileUploader } from "@nimbus-ds/styles";
import { FileUploaderSkeleton, FileUploaderOverlay } from "./components";
import { FileUploaderOverlayProps } from "./components/FileUploaderOverlay";

export interface FileUploaderComponents {
  Skeleton: typeof FileUploaderSkeleton;
  Overlay: typeof FileUploaderOverlay;
}

export interface FileUploaderProperties {
  /**
   * Provide additional context to the action.
   */
  placeholder?: string;
  /**
   * Accept file types
   * @default image/jpeg,image/gif,image/png
   */
  accept?: string;
  /**
   * Height value of the file uploader. Defaults to 100%.
   * @default 100%
   */
  height?: string;
  /**
   * Width value of the file uploader. Defaults to 100%.
   * @default 100%
   */
  width?: string;
  /**
   * Permitted aspect ratios for the size of the file uploader.
   * @default 1/1
   */
  aspectRatio?: (typeof fileUploader.properties.aspectRatio)[number];
  /**
   * Defines the position of the placeholder in relation to the icon.
   * @default column
   */
  flexDirection?: (typeof fileUploader.properties.flexDirection)[number];
  /**
   * Callback fired when files are dropped (before validation)
   */
  onDrop?: (event: DragEvent<HTMLLabelElement>) => void;
  /**
   * Callback fired when all dropped files are rejected due to file type validation
   */
  onDropReject?: (event: DragEvent<HTMLLabelElement>) => void;
  /**
   * Callback fired when files are successfully accepted and processed
   */
  onDropSuccess?: (event: DragEvent<HTMLLabelElement>) => void;
  /**
   * Callback fired when an error occurs during file drop processing
   */
  onError?: (error: Error) => void;
  /**
   * Callback fired when a drag operation enters the container
   */
  onDragEnter?: (event: DragEvent<HTMLLabelElement>) => void;
  /**
   * Callback fired when a drag operation leaves the container
   */
  onDragLeave?: (event: DragEvent<HTMLLabelElement>) => void;
  /**
   * Content to render inside the file uploader container
   */
  children?: ReactNode;
  /**
   * Hides the default icon when true
   * @default true
   */
  showIcon?: boolean;
  /**
   * Border color of the file uploader
   * @default primary-interactive
   */
  borderColor?: keyof typeof fileUploader.properties.borderColor;
  /**
   * Background color of the file uploader
   * @default primary-surface
   */
  backgroundColor?: keyof typeof fileUploader.properties.backgroundColor;
  /**
   * Custom overlay element to render when dragging files over the uploader.
   * When defined, this overlay will be displayed instead of children during drag operations.
   */
  dragOverlay?: ReactElement<FileUploaderOverlayProps>;

  uninteractive?: boolean;
}

export type FileUploaderProps = FileUploaderProperties &
  InputHTMLAttributes<HTMLInputElement>;
