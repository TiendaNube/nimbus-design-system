import { ButtonHTMLAttributes } from "react";
import { LinkProps } from "../../link.types";

export type LinkButtonProps = Omit<LinkProps, "LinkHTMLAttributes"> &
  ButtonHTMLAttributes<HTMLButtonElement>;
