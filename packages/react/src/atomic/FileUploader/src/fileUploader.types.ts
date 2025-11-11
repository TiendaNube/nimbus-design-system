import { InputHTMLAttributes, DragEvent } from "react";
import { fileUploader } from "@nimbus-ds/styles";
import { FileUploaderSkeleton } from "./components";

export interface FileUploaderComponents {
  Skeleton: typeof FileUploaderSkeleton;
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
}

export type FileUploaderProps = FileUploaderProperties &
  InputHTMLAttributes<HTMLInputElement>;
