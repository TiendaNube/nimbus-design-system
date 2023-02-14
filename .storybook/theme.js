import { create } from "@storybook/theming";
import LOGO from "./nimbus-logo.png";

export const base = {
  base: "light",
  brandTitle: "Design System Nimbus",
  brandUrl: "https://nimbus.nuvemshop.com.br",
  brandImage: LOGO,

  fontBase:
    "CentraNube, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', arial, sans-serif",
};

export default create(base);
