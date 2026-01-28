import { type ButtonHTMLAttributes } from "react";
import { type InputBaseProps } from "../../input.types";

export type InputIconProperties = Required<
  Pick<InputBaseProps, "appendPosition">
>;

export type InputIconProps = InputIconProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;
