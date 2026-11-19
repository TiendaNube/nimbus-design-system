import { style, globalStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../themes";

/** Width used for thin scrollbars across WebKit browsers. */
export const SCROLLBAR_WIDTH = "4px";

/**
 * Thin scrollbar style — applied directly to Nimbus components.
 * Shows a subtle scrollbar thumb on hover, thin and theme-aware.
 */
export const thinScrollbar = style({
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  selectors: {
    "&:hover": {
      scrollbarColor: `${varsThemeBase.colors.neutral.interactive} transparent`,
    },
    // Chrome, Safari, Edge
    "&::-webkit-scrollbar": {
      width: SCROLLBAR_WIDTH,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
      borderRadius: varsThemeBase.shape.border.radius[1],
    },
    "&:hover::-webkit-scrollbar-thumb": {
      background: varsThemeBase.colors.neutral.interactive,
    },
  },
});

/**
 * Thin scrollbar that is always visible (not just on hover).
 * Used for components where permanent scroll indication is needed.
 *
 * The standard `scrollbar-width` / `scrollbar-color` properties only apply where
 * `::-webkit-scrollbar` is not supported (Firefox): in Chromium they override the
 * WebKit pseudo-elements, and with macOS overlay scrollbars the bar then stays
 * hidden until the person scrolls.
 */
export const thinScrollbarAlways = style({
  "@supports": {
    "not selector(::-webkit-scrollbar)": {
      scrollbarWidth: "thin",
      scrollbarColor: `${varsThemeBase.colors.neutral.interactive} transparent`,
    },
  },
  selectors: {
    "&::-webkit-scrollbar": {
      width: SCROLLBAR_WIDTH,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: varsThemeBase.shape.border.radius[1],
    },
  },
});

globalStyle(`${thinScrollbarAlways}::-webkit-scrollbar-thumb`, {
  background: varsThemeBase.colors.neutral.interactive,
});
