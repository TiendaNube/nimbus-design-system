import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { box as boxStyles } from "@nimbus-ds/styles";

import { Box as BoxComponent } from "./Box";
import { BoxProps } from "./box.types";

export const Box: React.FC<BoxProps> = (props) => <BoxComponent {...props} />;

export default {
  title: "Atomic/Box",
  component: Box,
  argTypes: {
    children: { control: { disable: true } },
    as: {
      control: { disable: true },
      table: {
        type: {
          required: false,
          summary: '"HTML tags" | "ReactNode of type HTML tag"',
        },
        defaultValue: { summary: "div" },
      },
      description:
        "The underlying element to render — either a HTML element name or a React component.",
    },
    ref: {
      control: { disable: true },
      description:
        "A ref to the element rendered by this component. Because this component is polymorphic, the type will vary based on the value of the as prop.",
    },
    backgroundColor: {
      options: Object.keys(boxStyles.properties.backgroundColor),
    },
    borderColor: {
      options: Object.keys(boxStyles.properties.borderColor),
    },
    color: {
      options: Object.keys(boxStyles.properties.color),
    },
    borderStyle: {
      control: { type: "radio" },
      options: boxStyles.properties.borderStyle,
    },
    boxSizing: {
      control: { type: "radio" },
      options: boxStyles.properties.boxSizing,
    },
    cursor: {
      control: { type: "radio" },
      options: boxStyles.properties.cursor,
    },
    position: {
      control: { type: "radio" },
      options: boxStyles.properties.position,
    },
    overflow: {
      control: { type: "radio" },
      options: boxStyles.properties.overflow,
    },
    overflowX: {
      control: { type: "radio" },
      options: boxStyles.properties.overflowX,
    },
    overflowY: {
      control: { type: "radio" },
      options: boxStyles.properties.overflowY,
    },
    display: {
      control: { type: "radio" },
      options: boxStyles.properties.display,
    },
    flexDirection: {
      control: { type: "radio" },
      options: boxStyles.properties.flexDirection,
    },
    flexWrap: {
      control: { type: "radio" },
      options: boxStyles.properties.flexWrap,
    },
    justifyContent: {
      control: { type: "radio" },
      options: boxStyles.properties.justifyContent,
    },
    alignItems: {
      control: { type: "radio" },
      options: boxStyles.properties.alignItems,
    },
    alignSelf: {
      control: { type: "radio" },
      options: boxStyles.properties.alignSelf,
    },
    gridGap: {
      options: Object.keys(boxStyles.properties.gridGap),
    },
    gap: {
      options: Object.keys(boxStyles.properties.gap),
    },
    zIndex: {
      control: { type: "number" },
    },
    backgroundImage: {
      control: { type: "text" },
    },
    backgroundPosition: {
      control: { type: "text" },
    },
    backgroundBlendMode: {
      control: { type: "text" },
    },
    backgroundRepeat: {
      control: { type: "text" },
    },
    backgroundSize: {
      control: { type: "text" },
    },
    minWidth: {
      control: { type: "text" },
    },
    minHeight: {
      control: { type: "text" },
    },
    order: {
      control: { type: "text" },
    },
    flexGrow: {
      control: { type: "text" },
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof BoxComponent>;

const Template: ComponentStory<typeof BoxComponent> = (args) => (
  <Box {...args} />
);

export const box = Template.bind({});
box.args = {
  height: "5rem",
  width: "12rem",
  borderColor: "neutral-interactive",
  borderWidth: "2px",
  borderStyle: "dashed",
  borderRadius: "0.5rem",
};

export const responsive = Template.bind({});
responsive.args = {
  height: {
    xl: "6rem",
    lg: "4rem",
    md: "3rem",
    xs: "2rem",
  },
  width: {
    xl: "12rem",
    lg: "10rem",
    md: "8rem",
    xs: "2rem",
  },
  backgroundColor: {
    xl: "warning-interactive",
    lg: "success-interactive",
    md: "danger-interactive",
    xs: "primary-interactive",
  },
  paddingX: {
    xl: "8",
    lg: "6",
    md: "4",
    xs: "none",
  },
  borderRadius: {
    xl: "1rem",
    lg: "0.5rem",
    md: "0.2rem",
    xs: "100%",
  },
};
