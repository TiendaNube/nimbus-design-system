import { InputHTMLAttributes } from "react";
import { InputBaseProps } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputPasswordBaseProps = InputPasswordProperties &
  InputHTMLAttributes<HTMLInputElement>;
