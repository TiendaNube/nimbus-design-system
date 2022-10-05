import { recipe } from "@vanilla-extract/recipes";
import { button as buttonStyle } from "../button";

import { varsThemeBase } from "../../themes/base.css";

export const style = recipe({
  base: {
    alignItems: "center",
    appearance: "none",
    display: "inline-flex",
    gap: varsThemeBase.spacing[1],
    textAlign: "inherit",

    fontFamily: varsThemeBase.fontFamily.centranube,

    cursor: "pointer",
    boxSizing: "border-box",

    transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  },

  variants: {
    appearance: {
      primary: {
        color: varsThemeBase.colors.primary.interactive,
        ":hover": {
          color: varsThemeBase.colors.primary.interactiveHover,
        },
        ":active": {
          color: varsThemeBase.colors.primary.interactivePressed,
        },
        ":focus": {
          outline: `${varsThemeBase.colors.primary.interactivePressed} auto 1px`,
        },
      },
      danger: {
        color: varsThemeBase.colors.danger.interactive,
        ":hover": {
          color: varsThemeBase.colors.danger.interactiveHover,
        },
        ":active": {
          color: varsThemeBase.colors.danger.interactivePressed,
        },
        ":focus": {
          outline: `${varsThemeBase.colors.danger.interactivePressed} auto 1px`,
        },
      },
      neutral: {
        color: varsThemeBase.colors.neutral.textLow,
        ":hover": {
          color: varsThemeBase.colors.neutral.textDisabled,
        },
        ":active": {
          color: varsThemeBase.colors.neutral.textHigh,
        },
        ":focus": {
          outline: `${varsThemeBase.colors.neutral.textHigh} auto 1px`,
        },
      },
    },

    size: {
      caption: {
        fontSize: varsThemeBase.fontSize.body.caption,
        lineHeight: varsThemeBase.lineWeight.body.caption,
      },
      base: {
        fontSize: varsThemeBase.fontSize.body.base,
        lineHeight: varsThemeBase.lineWeight.body.base,
      },
      highlight: {
        fontSize: varsThemeBase.fontSize.body.highlight,
        lineHeight: varsThemeBase.lineWeight.body.highlight,
      },
    },

    textDecoration: {
      underline: {},
      none: {},
    },

    as: {
      link: {
        fontWeight: varsThemeBase.fontWeight.regular,
        borderRadius: varsThemeBase.spacing[1],
      },
      button: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        as: "button",
        appearance: "primary",
      },
      style: [
        buttonStyle.style.primary,
        {
          color: varsThemeBase.colors.neutral.background,
          ":hover": {
            color: varsThemeBase.colors.neutral.background,
          },
          ":active": {
            color: varsThemeBase.colors.neutral.background,
          },
          ":focus": {
            color: varsThemeBase.colors.neutral.background,
          },
        },
      ],
    },
    {
      variants: {
        as: "button",
        appearance: "danger",
      },
      style: [
        buttonStyle.style.danger,
        {
          color: varsThemeBase.colors.neutral.background,
          ":hover": {
            color: varsThemeBase.colors.neutral.background,
          },
          ":active": {
            color: varsThemeBase.colors.neutral.background,
          },
          ":focus": {
            color: varsThemeBase.colors.neutral.background,
          },
        },
      ],
    },
    {
      variants: {
        as: "button",
        appearance: "neutral",
      },
      style: [
        buttonStyle.style.neutral,
        {
          color: varsThemeBase.colors.neutral.textLow,
          ":hover": {
            color: varsThemeBase.colors.neutral.textLow,
          },
          ":active": {
            color: varsThemeBase.colors.neutral.textLow,
          },
          ":focus": {
            color: varsThemeBase.colors.neutral.textLow,
          },
        },
      ],
    },
    {
      variants: {
        as: "link",
        textDecoration: "underline",
      },
      style: {
        textDecoration: "underline",
      },
    },
  ],

  defaultVariants: {
    appearance: "neutral",
    as: "link",
    textDecoration: "underline",
    size: "base",
  },
});
