import { style as vanillaStyle, createVar } from "@vanilla-extract/css";
import { mediaQueries, varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  gap: varsThemeBase.spacing[1],
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

/** Number of characters the go-to-page input currently displays. */
export const goToPageCharsVar = createVar();

/**
 * The input hugs its content: one `ch` per displayed character plus the horizontal
 * padding and border of the input, never narrower than `spacing-8`.
 */
export const goToPage__input = vanillaStyle({
  flexShrink: 0,
  boxSizing: "border-box",
  width: `max(${varsThemeBase.spacing[8]}, calc(${goToPageCharsVar} * 1ch + ${varsThemeBase.spacing[2]} * 2 + ${varsThemeBase.shape.border.width[1]} * 2))`,
});
