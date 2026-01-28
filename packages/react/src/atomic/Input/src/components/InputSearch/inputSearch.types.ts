import { type InputHTMLAttributes } from "react";
import { type InputBaseProps } from "../../input.types";

export type InputSearchProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputSearchBaseProps = InputSearchProperties &
  InputHTMLAttributes<HTMLInputElement>;
