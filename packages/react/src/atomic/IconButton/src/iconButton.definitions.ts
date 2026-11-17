import { iconButton } from "@nimbus-ds/styles";
import { type IconButtonProps } from "./iconButton.types";

type BackgroundColor = IconButtonProps["backgroundColor"];
type BorderColor = IconButtonProps["borderColor"];

/** Default IconButton size under Norte UI (28px), matching the medium Button. */
export const NORTEUI_ICON_BUTTON_SIZE = "1.75rem";

/** Default size in base, dark, next and next-dark. */
export const DEFAULT_ICON_BUTTON_SIZE = "2.75rem";

const defaultBackgroundColor: BackgroundColor = {
  xs: "neutral-surface",
  active: "neutral-interactive",
  hover: "neutral-surfaceHighlight",
};

const defaultBorderColor: BorderColor = {
  xs: "neutral-interactive",
  active: "neutral-interactivePressed",
  hover: "neutral-interactiveHover",
  focus: "primary-interactive",
};

/**
 * True only for the Norte UI themes. Compares exact theme names: `next` and
 * `next-dark` must keep the current IconButton. Returns false when the
 * resolved @nimbus-ds/styles has no Norte UI IconButton classes yet, so the
 * IconButton never half-applies the new look with an older styles release.
 */
export const isNorteUiTheme = (currentTheme?: string): boolean =>
  (currentTheme === "next-norteui" || currentTheme === "next-norteui-dark") &&
  Boolean(iconButton.classnames.norteui);

/**
 * Norte UI fill for the background values that have a Figma recipe: the
 * default (no value), `transparent` and `ai-generativeSurface`. A fill owns
 * both background and border, so an explicit `borderColor` does not apply
 * with it. Any other background returns undefined and keeps its sprinkles.
 */
export const getNorteUiFill = (
  backgroundColor: BackgroundColor
): string | undefined => {
  if (backgroundColor === undefined)
    return iconButton.classnames.norteuiNeutral;
  if (backgroundColor === "transparent")
    return iconButton.classnames.norteuiTransparent;
  if (backgroundColor === "ai-generativeSurface")
    return iconButton.classnames.norteuiAiSurface;
  return undefined;
};

interface ColorSprinkleOptions {
  isNorteUi: boolean;
  isAiGenerative: boolean;
  norteUiFill?: string;
  backgroundColor: BackgroundColor;
  borderColor: BorderColor;
}

/**
 * Background and border sprinkles. Outside Norte UI the current defaults
 * apply; under Norte UI only explicit values are forwarded, and none when a
 * Norte UI fill or the ai-generative appearance owns the colors.
 */
export const getColorSprinkles = ({
  isNorteUi,
  isAiGenerative,
  norteUiFill,
  backgroundColor,
  borderColor,
}: ColorSprinkleOptions): {
  backgroundColor?: BackgroundColor;
  borderColor?: BorderColor;
} => {
  if (isAiGenerative || norteUiFill) return {};
  if (!isNorteUi)
    return {
      backgroundColor: backgroundColor ?? defaultBackgroundColor,
      borderColor: borderColor ?? defaultBorderColor,
    };
  return {
    ...(backgroundColor !== undefined && { backgroundColor }),
    ...(borderColor !== undefined && { borderColor }),
  };
};

/** Classes added under Norte UI: shape, the AI focus ring and the fill. */
export const getNorteUiClassnames = (
  isNorteUi: boolean,
  isAiGenerative: boolean,
  norteUiFill?: string
): Array<string | undefined> => {
  if (!isNorteUi) return [];
  return [
    iconButton.classnames.norteui,
    isAiGenerative ? iconButton.classnames.norteuiAiGenerative : undefined,
    norteUiFill,
  ];
};

/** Icon color: the explicit one, else dimmed when disabled under Norte UI. */
export const getIconColor = (
  color: IconButtonProps["color"],
  isNorteUi: boolean,
  disabled?: boolean
): NonNullable<IconButtonProps["color"]> => {
  if (color) return color;
  return isNorteUi && disabled ? "neutral-textDisabled" : "neutral-textHigh";
};
