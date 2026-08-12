import { type InputHTMLAttributes } from "react";
import { type InputBaseProps, type InputProperties } from "../../input.types";

export type InputSearchProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputSearchBaseProps = InputSearchProperties &
  // Mirrors the `Omit` on `InputBaseProps` (see `input.types.ts`). Nothing
  // collides by name inside this type — `InputSearchProperties` picks neither
  // `prefix` nor `suffix` — but `InputHTMLAttributes` declares a global RDFa
  // `prefix?: string`, and since #487 widened `InputProperties.prefix` to a
  // `ReactNode` those two are no longer compatible, so an
  // `InputBaseProps`-typed object (e.g. shared props spread onto both `Input`
  // and `Input.Search`) stopped being assignable here. The `Omit` drops
  // exactly that one native attribute to restore it.
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputProperties>;
