import { ButtonHTMLAttributes } from "react";
import { InputProps } from "../../input.types";

export type InputIconProperties = Required<Pick<InputProps, "appendPosition">>;

export type InputIconProps = InputIconProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;
