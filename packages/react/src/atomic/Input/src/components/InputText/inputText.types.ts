import { type HTMLAttributes } from "react";
import { type InputBaseProps } from "../../input.types";

export type InputTextProperties = Required<
  Pick<InputBaseProps, "appendPosition">
>;

export type InputTextProps = InputTextProperties &
  HTMLAttributes<HTMLSpanElement>;
