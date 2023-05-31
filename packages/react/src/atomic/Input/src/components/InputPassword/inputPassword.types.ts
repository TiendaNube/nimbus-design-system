import { InputHTMLAttributes } from "react";
import { InputBaseProps } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled"
>;

export type InputPasswordBaseProps = InputPasswordProperties &
  InputHTMLAttributes<HTMLInputElement>;
