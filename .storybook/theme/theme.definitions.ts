import { create } from "@storybook/theming/create";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

export const base = {
  brandTitle: "Design System Nimbus",
  brandUrl: "https://nimbus.nuvemshop.com.br",
  brandImage: "./static/logo.png",
  brandTarget: "_self",
  fontBase:
    "CentraNube, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', arial, sans-serif",
};

export const light = create({ ...base, base: "light" });

export const dark = create({
  ...base,
  base: "dark",
  appBg: tokens.color.dark.neutral.background.value,
  barBg: tokens.color.dark.neutral.surface.value,
  textColor: tokens.color.dark.neutral["text-high"].value,
});

export default light;
