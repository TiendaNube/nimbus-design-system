import { ReactNode, HTMLAttributes } from "react";
import { fileUploader } from "@nimbus-ds/styles";

export interface FileUploaderOverlayProperties {
  /**
   * Title text displayed in the overlay
   */
  title?: string;
  /**
   * Subtitle text displayed below the title
   */
  subtitle?: string;
  /**
   * Source URL for the image displayed in the overlay
   */
  imageSrc?: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Border color of the overlay
   * @default primary-interactive
   */
  borderColor?: keyof typeof fileUploader.properties.borderColor;
  /**
   * Background color of the overlay
   * @default primary-surface
   */
  backgroundColor?: keyof typeof fileUploader.properties.backgroundColor;
  /**
   * Content to render inside the overlay
   */
  children?: ReactNode;
}

export type FileUploaderOverlayProps = FileUploaderOverlayProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "title">;
