import type { ReactNode, ImgHTMLAttributes } from "react";
import type { thumbnail } from "@nimbus-ds/styles";
import type { ThumbnailSkeleton } from "./components";

export interface ThumbnailComponents {
  Skeleton: typeof ThumbnailSkeleton;
}

export interface ThumbnailProperties {
  /**
   * The required alt attribute specifies an alternate text for an image, if the image cannot be displayed.
   */
  alt: string;
  /**
   * The content of the thumbnail.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * Permitted aspect ratios for the size of the thumbnail image.
   * @default 1/1
   */
  aspectRatio?: (typeof thumbnail.properties.aspectRatio)[number];
  /**
   * Width value of the thumbnail image. Defaults to 100%.
   * @default 100%
   */
  width?: string;
}

export type ThumbnailProps = ThumbnailProperties &
  ImgHTMLAttributes<HTMLImageElement>;
