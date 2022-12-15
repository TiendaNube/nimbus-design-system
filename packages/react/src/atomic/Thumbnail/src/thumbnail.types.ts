import { ReactNode, ImgHTMLAttributes } from "react";
import { thumbnail } from "@nimbus-ds/styles";
import { ThumbnailSkeleton } from "./components";

export interface ThumbnailComponents {
  Skeleton: typeof ThumbnailSkeleton;
}

export interface ThumbnailProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** The required alt attribute specifies an alternate text for an image, if the image cannot be displayed. */
  alt: string;
  /** Element to be displayed on thumbnail */
  children?: ReactNode;
  /** Permitted aspect ratios for the size of the image */
  aspectRatio?: typeof thumbnail.properties.aspectRatio[number];
  /** Width value of the image. Defaults to 100% */
  width?: string;
}
