import { HTMLAttributes } from "react";

import { ToastProvider } from "./components";

export interface ToastComponents {
  Provider: typeof ToastProvider;
}

export type Types = "primary" | "success" | "danger" | "progress";
export type TypesColors = Omit<Types, "progress"> & "neutral";

export interface ToastProperties {
  /**
   * Unique toast ID used when hiding or removing a toast.
   */
  id: string;
  /**
   * The text that should appear in the toast message.
   */
  text: string;
  /**
   * Change the visual style of the toast.
   * @default primary
   */
  type?: Types;
  /**
   * The time in milliseconds that the toast message should persist.
   * @default 4000
   */
  duration?: 4000 | 8000 | 16000;
  /**
   * Tells you whether or not Toast should close automatically.
   * @default true
   */
  autoClose?: boolean;
  /**
   * Tells the toast position when we are using multiple toasts.
   * @default 0
   */
  position?: number;
}

export type ToastProps = ToastProperties & HTMLAttributes<HTMLDivElement>;
