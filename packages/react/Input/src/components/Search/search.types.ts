import { InputHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type SearchProps = Pick<InputProps, "appearance" | "disabled"> &
  InputHTMLAttributes<HTMLInputElement>;
