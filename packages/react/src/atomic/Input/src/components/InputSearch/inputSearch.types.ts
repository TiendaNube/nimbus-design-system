import { InputHTMLAttributes } from "react";
import { InputBaseProps } from "../../input.types";

export type InputSearchProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled"
>;

export type InputSearchBaseProps = InputSearchProperties &
  InputHTMLAttributes<HTMLInputElement>;
