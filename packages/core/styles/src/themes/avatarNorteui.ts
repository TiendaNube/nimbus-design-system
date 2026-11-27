import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

/**
 * Avatar values for next-norteui and next-norteui-dark: the same sizes and
 * color roles as the other themes, resolved to the Norte UI palette. The
 * medium initial keeps 14px instead of the 13px Norte UI body base, and
 * neutral uses interactive: surfaceHighlight is the pressed background of the
 * transparent Button, so the circle would vanish inside it.
 */
export const avatarNorteui = {
  ...globalTheme.components.avatar,
  medium: {
    ...globalTheme.components.avatar.medium,
    fontSize: globalTheme.fontSize.body.base
  },
  neutral: {
    ...globalTheme.components.avatar.neutral,
    background: vars.colors.neutral.interactive
  }
};
