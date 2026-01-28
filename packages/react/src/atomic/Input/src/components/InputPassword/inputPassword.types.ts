import type { InputHTMLAttributes } from "react";
import type { InputBaseProps } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputPasswordBaseProps = InputPasswordProperties &
  InputHTMLAttributes<HTMLInputElement>;
