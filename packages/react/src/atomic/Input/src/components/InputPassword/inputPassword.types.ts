import { type InputHTMLAttributes } from "react";
import { type InputBaseProps, type InputProperties } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputPasswordBaseProps = InputPasswordProperties &
  // Same collision `InputBaseProps` guards against (see `input.types.ts`):
  // `InputHTMLAttributes` declares a global RDFa `prefix?: string` that
  // clashes with `InputProperties.prefix` (a `ReactNode`). Omitting every key
  // already declared on `InputProperties` keeps a wider, `InputBaseProps`-
  // shaped object (e.g. shared props spread onto both `Input` and
  // `Input.Password`) assignable here too.
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputProperties>;
