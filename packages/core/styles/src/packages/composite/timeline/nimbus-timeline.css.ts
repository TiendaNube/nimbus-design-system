import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "1.5rem",
  justifyContent: "center",
  maxWidth: "350px",
});

export const styles = {
  container,
};

const itemContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
  position: "relative",
  selectors: {
    "&::before": {
      content: "",
      width: "2px",
      height: "100%",
      position: "absolute",
      top: "50%",
      display: "block",
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      zIndex: "-1",
      transform: "translateX(-50%)",
      left: varsThemeBase.spacing[4],
    },
    "&:last-of-type::before": {
      display: "none",
    },
  },
});

const leftContent = style({
  display: "flex",
  alignItems: "center",
});

const timelineItemDate = style({
  alignSelf: "end",
  padding: varsThemeBase.spacing["0-5"],
});

const iconContainer = style({
  borderRadius: varsThemeBase.shape.border.radius.full,
  marginRight: varsThemeBase.spacing[6],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transform: "translateX(-50%)",
});

export const timelineItemStyles = {
  itemContainer,
  timelineItemDate,
  iconContainer,
  leftContent,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const iconContainerProperties = {
  backgroundColor: {
    pending: varsThemeBase.colors.neutral.surfaceHighlight,
    paid: varsThemeBase.colors.success.surfaceHighlight,
    fulfilled: varsThemeBase.colors.success.surfaceHighlight,
    unfulfilled: varsThemeBase.colors.primary.surfaceHighlight,
  },
  height: {
    pending: varsThemeBase.spacing[2],
    paid: varsThemeBase.spacing[6],
    fulfilled: varsThemeBase.spacing[6],
    unfulfilled: varsThemeBase.spacing[6],
  },
  width: {
    pending: varsThemeBase.spacing[2],
    paid: varsThemeBase.spacing[6],
    fulfilled: varsThemeBase.spacing[6],
    unfulfilled: varsThemeBase.spacing[6],
  },
  marginRight: {
    pending: varsThemeBase.spacing[4],
    paid: "0",
    fulfilled: "0",
    unfulfilled: "0",
  },
};

export const iconContainerSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: iconContainerProperties,
      shorthands: {
        type: ["height", "width", "backgroundColor", "marginRight"],
      },
    })
  ),
  properties: iconContainerProperties,
};
