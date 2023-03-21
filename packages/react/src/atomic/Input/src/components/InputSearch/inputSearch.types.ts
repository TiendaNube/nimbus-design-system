import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type InputSearchProperties = Pick<InputProps, "appearance" | "disabled">;

export type InputSearchProps = InputSearchProperties &
  InputHTMLAttributes<HTMLInputElement>;
