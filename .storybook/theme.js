import { create } from "@storybook/theming";
import LOGO from "./nimbus-logo.png";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

export const base = {
  base: "light",
  brandTitle: "Design System Nimbus",
  brandUrl: "https://nimbus.nuvemshop.com.br",
  brandImage: LOGO,

  fontBase:
    "CentraNube, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', arial, sans-serif",
};

export const darkExtend = {
  base: "dark",

  appBg: tokens.color.dark.neutral.background.value,
  appContentBg: tokens.color.dark.neutral.surface.value,

  barBg: tokens.color.dark.neutral.surface.value,

  textColor: tokens.color.dark.neutral["text-high"].value,
};

export default create(base, darkExtend);
