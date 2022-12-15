import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type InputSearchProps = Pick<InputProps, "appearance" | "disabled"> &
  InputHTMLAttributes<HTMLInputElement>;
