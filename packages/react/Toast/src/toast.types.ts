import { HTMLAttributes } from "react";

export type Types = "primary" | "success" | "danger" | "progress";
export type TypesColors = Omit<Types, "progress"> & "neutral";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast id */
  id: string;
  /** Toast size */
  text: string;
  /** Toast type */
  type?: Types;
  /** Toast display time */
  duration?: 4000 | 8000 | 16000;
  /** Tells you whether or not Toast should close automatically */
  autoClose?: boolean;
  /** Tells the toast position when we are using multiple toasts */
  position?: number;
}
