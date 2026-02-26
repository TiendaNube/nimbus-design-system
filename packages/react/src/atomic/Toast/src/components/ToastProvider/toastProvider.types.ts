import { type ReactNode } from "react";

export type ToastOffset = "default" | "high";
export type ToastBehavior = "stacked" | "single";

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
  /**
   * Controls how multiple toasts are handled.
   * "stacked" - new toasts are piled up alongside already rendered ones.
   * "single" - only one toast is shown at a time; each new toast immediately replaces the previous one.
   * @default "stacked"
   */
  behavior?: ToastBehavior;
}

export type ToastProviderProps = ToastProviderProperties;
