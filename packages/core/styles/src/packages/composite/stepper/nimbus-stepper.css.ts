import { globalStyle, style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: varsThemeBase.spacing[2],
  flexWrap: "wrap",
  justifyContent: "center",
});

const item = style({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[2],
  position: "relative",
  cursor: "pointer",
});

const item__disabled = style({
  cursor: "default",
});

const item__label = style({
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  transition: `color ${varsThemeBase.motion.speed.slow} ease`,
});

const item__label_started = style({
  color: varsThemeBase.colors.neutral.textLow,
});

const item__label_selected = style({
  color: varsThemeBase.colors.neutral.textHigh,
});

const item__label_completed = style({
  color: varsThemeBase.colors.neutral.textLow,
});

const item__label_pending = style({
  color: varsThemeBase.colors.neutral.interactiveHover,
});

// State variants for the icon
const item__icon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: varsThemeBase.spacing[6],
  height: varsThemeBase.spacing[6],
  borderRadius: varsThemeBase.shape.border.radius.full,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontWeight: varsThemeBase.fontWeight.medium,
  flexShrink: 0,
});

const item__icon_started = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  color: varsThemeBase.colors.neutral.textHigh,
  transition: `background-color ${varsThemeBase.motion.speed.slow} ease`,
});

const item__icon_selected = style({
  backgroundColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

const item__icon_completed = style({
  backgroundColor: varsThemeBase.colors.success.surfaceHighlight,
  transition: `background-color ${varsThemeBase.motion.speed.slow} ease`,
  color: varsThemeBase.colors.neutral.background,
});

const item__icon_pending = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  color: varsThemeBase.colors.neutral.textDisabled,
});

const item__line = style({
  height: varsThemeBase.shape.border.width[1],
  backgroundColor: varsThemeBase.colors.neutral.interactive,
  width: varsThemeBase.spacing[11],
});

/* -------------------------------------------------------------------------------------------------
 * Interactive State Variants
 * -----------------------------------------------------------------------------------------------*/

/**
 * Defines interactive state styles for stepper items
 * Organizes hover, active, and focus states for different item types
 */
const interactiveStateVariants = {
  completed: {
    label: {
      hover: { color: varsThemeBase.colors.neutral.textHigh },
      active: { color: varsThemeBase.colors.neutral.textHigh },
      focus: { color: varsThemeBase.colors.neutral.textLow },
    },
    icon: {
      hover: { backgroundColor: varsThemeBase.colors.success.interactive },
      active: {
        backgroundColor: varsThemeBase.colors.success.interactiveHover,
      },
      focus: {
        backgroundColor: varsThemeBase.colors.success.surfaceHighlight,
        boxShadow: varsThemeBase.utils.focus,
      },
    },
  },
  started: {
    label: {
      hover: { color: varsThemeBase.colors.neutral.textHigh },
      active: { color: varsThemeBase.colors.neutral.textHigh },
      focus: { color: varsThemeBase.colors.neutral.textLow },
    },
    icon: {
      hover: { backgroundColor: varsThemeBase.colors.neutral.interactive },
      active: {
        backgroundColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      focus: {
        backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
        boxShadow: varsThemeBase.utils.focus,
      },
    },
  },
};

/* -------------------------------------------------------------------------------------------------
 * Global styles - Applied using the interactive state variants
 * -----------------------------------------------------------------------------------------------*/

// Apply completed state interactive styles
globalStyle(
  `${item}:hover ${item__label_completed}`,
  interactiveStateVariants.completed.label.hover
);
globalStyle(
  `${item}:active ${item__label_completed}`,
  interactiveStateVariants.completed.label.active
);
globalStyle(
  `${item}:focus-visible ${item__label_completed}`,
  interactiveStateVariants.completed.label.focus
);

globalStyle(
  `${item}:hover ${item__icon_completed}`,
  interactiveStateVariants.completed.icon.hover
);
globalStyle(
  `${item}:active ${item__icon_completed}`,
  interactiveStateVariants.completed.icon.active
);
globalStyle(
  `${item}:focus-visible ${item__icon_completed}`,
  interactiveStateVariants.completed.icon.focus
);

// Apply started state interactive styles
globalStyle(
  `${item}:hover ${item__label_started}`,
  interactiveStateVariants.started.label.hover
);
globalStyle(
  `${item}:active ${item__label_started}`,
  interactiveStateVariants.started.label.active
);
globalStyle(
  `${item}:focus-visible ${item__label_started}`,
  interactiveStateVariants.started.label.focus
);

globalStyle(
  `${item}:hover ${item__icon_started}`,
  interactiveStateVariants.started.icon.hover
);
globalStyle(
  `${item}:active ${item__icon_started}`,
  interactiveStateVariants.started.icon.active
);
globalStyle(
  `${item}:focus-visible ${item__icon_started}`,
  interactiveStateVariants.started.icon.focus
);

export const styles = {
  container,
  item,
  item__disabled,
  item__icon,
  item__line,
  item__icon_started,
  item__icon_completed,
  item__icon_pending,
  item__icon_selected,
  item__label,
  item__label_started,
  item__label_selected,
  item__label_completed,
  item__label_pending,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const stepperProperties = {};

export const stepperSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: stepperProperties,
    })
  ),
  properties: stepperProperties,
};
