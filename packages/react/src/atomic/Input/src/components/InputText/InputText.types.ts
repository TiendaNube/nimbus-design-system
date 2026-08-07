import { type HTMLAttributes } from "react";
import { type InputBaseProps } from "../../input.types";

/**
 * Properties specific to `InputText`, the internal component used to render
 * the static `prefix`/`suffix` text inside the `Input` container.
 */
export interface InputTextProperties {
  /**
   * Which side of the `Input` container this text is rendered on: `"start"`
   * for a prefix, `"end"` for a suffix. Mirrors `InputBaseProps.appendPosition`.
   */
  appendPosition: Required<InputBaseProps>["appendPosition"];
}

/**
 * Props accepted by `InputText`. Extends `InputTextProperties` with the
 * native `<span>` HTML attributes, omitting `style` since `InputText.tsx`
 * already discards it.
 */
export interface InputTextProps
  extends InputTextProperties,
    Omit<HTMLAttributes<HTMLSpanElement>, "style"> {}
