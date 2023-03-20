import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputProps,
  "appearance" | "disabled"
>;

export type InputPasswordProps = InputPasswordProperties &
  InputHTMLAttributes<HTMLInputElement>;
