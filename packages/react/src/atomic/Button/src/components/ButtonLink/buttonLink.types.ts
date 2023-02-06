import { AnchorHTMLAttributes } from "react";
import { ButtonProps } from "../../button.types";

type Extend = Omit<ButtonProps, "ButtonHTMLAttributes" | "disabled"> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonLinkProps extends Extend {
  href: string;
}
