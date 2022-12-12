import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type PasswordProps = Pick<InputProps, "appearance" | "disabled"> &
  InputHTMLAttributes<HTMLInputElement>;
