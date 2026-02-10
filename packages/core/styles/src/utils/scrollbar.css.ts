import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../themes";

const thinScrollbarBase = style({
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: `transparent transparent`,
  selectors: {
    "&:hover": {
      scrollbarColor: `${varsThemeBase.colors.neutral.interactive} transparent`,
    },
  },
  // @ts-expect-error - vendor prefixed pseudo-elements
  "::-webkit-scrollbar": {
    width: "4px",
  },
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: varsThemeBase.shape.border.radius[1],
  },
});

/**
 * Thin scrollbar variants.
 *
 * - `hover`: Scrollbar thumb only appears on hover (default, recommended for clean UI)
 * - `always`: Scrollbar thumb is always visible when content overflows
 */
export const thinScrollbar = styleVariants({
  hover: [thinScrollbarBase],
  always: [
    thinScrollbarBase,
    {
      scrollbarColor: `${varsThemeBase.colors.neutral.interactive} transparent`,
    },
  ],
});
