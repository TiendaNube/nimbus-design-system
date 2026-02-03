import { ReactNode } from "react";

export type ToastOffset = "default" | "high";

export interface ToastProviderProperties {
  /**
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Controls the vertical offset of the toast container from the bottom.
   * Use "high" for mobile apps with bottom navigation bars.
   * @default "default"
   */
  offset?: ToastOffset;
}

export type ToastProviderProps = ToastProviderProperties;
