import { style as vanillaStyle, globalStyle } from "@vanilla-extract/css";
import { mediaQueries, varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  gap: varsThemeBase.spacing[1],
});

/**
 * Lets the validation message sit on its own row below the controls. Only
 * applied while an error is showing, so the default layout never wraps.
 */
export const container__wrap = vanillaStyle({
  flexWrap: "wrap",
});

/* -------------------------------------------------------------------------------------------------
 * Responsive layouts
 *
 * Below the `md` breakpoint (mobile, `xs` tier) `Pagination` switches to a compact
 * first / previous / go-to-page / next / last row when there are enough pages. From `md` up
 * the regular layout (numbers, optional go-to-page input) applies.
 * -----------------------------------------------------------------------------------------------*/

/** Rendered only in the compact layout: hidden from `md` up. */
export const compactOnly = vanillaStyle({
  "@media": {
    [mediaQueries.md()]: {
      display: "none",
    },
  },
});

/** Replaced by the compact layout: hidden below `md`, regular item from `md` up. */
export const compactHidden = vanillaStyle({
  display: "none",
  "@media": {
    [mediaQueries.md()]: {
      display: "list-item",
    },
  },
});

/** The optional go-to-page input (`showInput`): hidden below `md`. */
export const goToPage__desktop = vanillaStyle({
  display: "none",
  alignItems: "center",
  gap: varsThemeBase.spacing[2],
  marginLeft: varsThemeBase.spacing[3],
  "@media": {
    [mediaQueries.md()]: {
      display: "flex",
    },
  },
});

export const goToPage__compact = vanillaStyle({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[2],
});

/**
 * The input hugs its content, so its width is driven from the wrapper.
 * Native spinners are removed because they would take up the width the digits need.
 */
export const goToPage__input = vanillaStyle({
  flexShrink: 0,
});

globalStyle(`${goToPage__input} input[type="number"]`, {
  MozAppearance: "textfield",
});

globalStyle(
  `${goToPage__input} input[type="number"]::-webkit-outer-spin-button`,
  {
    WebkitAppearance: "none",
    margin: 0,
  }
);

globalStyle(
  `${goToPage__input} input[type="number"]::-webkit-inner-spin-button`,
  {
    WebkitAppearance: "none",
    margin: 0,
  }
);

/** Screen-reader only text. Stays available to `aria-describedby`. */
export const visuallyHidden = vanillaStyle({
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

/** Validation message: spans the full row below the controls. */
export const error = vanillaStyle({
  flexBasis: "100%",
});
