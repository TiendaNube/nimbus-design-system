import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type InputPasswordProps = Pick<InputProps, "appearance" | "disabled"> &
  InputHTMLAttributes<HTMLInputElement>;
