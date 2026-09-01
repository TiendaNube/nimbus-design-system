import { type InputHTMLAttributes } from "react";
import { type InputBaseProps, type InputProperties } from "../../input.types";

export type InputPasswordProperties = Pick<
  InputBaseProps,
  "appearance" | "disabled" | "aiGenerated"
>;

export type InputPasswordBaseProps = InputPasswordProperties &
  // Mirrors the `Omit` on `InputBaseProps` (see `input.types.ts`). Nothing
  // collides by name inside this type — `InputPasswordProperties` picks
  // neither `prefix` nor `suffix` — but `InputHTMLAttributes` declares a
  // global RDFa `prefix?: string`, and since #487 widened
  // `InputProperties.prefix` to a `ReactNode` those two are no longer
  // compatible, so an `InputBaseProps`-typed object (e.g. shared props spread
  // onto both `Input` and `Input.Password`) stopped being assignable here.
  // The `Omit` itself strips every native key `InputProperties` also declares
  // — not just `prefix`, but `disabled` too — yet `disabled` comes straight
  // back through the `Pick` above, so the composed type gives up exactly one
  // native prop: the RDFa `prefix`.
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputProperties>;
