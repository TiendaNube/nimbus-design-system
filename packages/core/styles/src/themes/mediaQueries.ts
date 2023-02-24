import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const { breakpoint } = tokens;

export const mediaQueries = {
  xs: () => `screen and (min-width: ${breakpoint.xs.value})`,
  md: () => `screen and (min-width: ${breakpoint.md.value})`,
  lg: () => `screen and (min-width: ${breakpoint.lg.value})`,
  xl: () => `screen and (min-width: ${breakpoint.xl.value})`,
};
