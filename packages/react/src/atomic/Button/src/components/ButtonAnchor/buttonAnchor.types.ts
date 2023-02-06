import { AnchorHTMLAttributes } from "react";
import { ButtonProps } from "../../button.types";

type Extend = Omit<ButtonProps, "ButtonHTMLAttributes" | "disabled"> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonAnchorProps extends Extend {
  href: string;
}
