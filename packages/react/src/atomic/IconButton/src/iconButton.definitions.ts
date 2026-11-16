import { iconButton } from "@nimbus-ds/styles";

/** Default IconButton size under Norte UI (28px), matching the medium Button. */
export const NORTEUI_ICON_BUTTON_SIZE = "1.75rem";

/**
 * True only for the Norte UI themes. Compares exact theme names: `next` and
 * `next-dark` must keep the current IconButton. Returns false when the
 * resolved @nimbus-ds/styles has no Norte UI IconButton classes yet, so the
 * IconButton never half-applies the new look with an older styles release.
 */
export const isNorteUiTheme = (currentTheme?: string): boolean =>
  (currentTheme === "next-norteui" || currentTheme === "next-norteui-dark") &&
  Boolean(iconButton.classnames.norteui);
