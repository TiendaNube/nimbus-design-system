import { InputHTMLAttributes } from "react";
import { fileUploader } from "@nimbus-ds/styles";
import { FileUploaderSkeleton } from "./components";

export interface FileUploaderComponents {
  Skeleton: typeof FileUploaderSkeleton;
}

export interface FileUploaderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /** Provide additional context to the action */
  placeholder?: string;
  /** Accept file types */
  accept?: string;
  /** Height value of the file uploader. Defaults to 100% */
  height?: string;
  /** Width value of the file uploader. Defaults to 100% */
  width?: string;
  /** Permitted aspect ratios for the size of the file uploader */
  aspectRatio?: keyof typeof fileUploader.properties.aspectRatio;
  /** Defines the position of the placeholder in relation to the icon */
  flexDirection?: keyof typeof fileUploader.properties.flexDirection;
}
