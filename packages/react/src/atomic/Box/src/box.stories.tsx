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
    gridGap: {
      options: Object.keys(boxStyles.properties.gridGap),
    },
    gap: {
      options: Object.keys(boxStyles.properties.gap),
    },
    zIndex: {
      control: { type: "number" },
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
  borderColor: "neutral.interactive",
  borderWidth: "2px",
  borderStyle: "dashed",
  borderRadius: "0.5rem",
};

export const responsive = Template.bind({});
responsive.args = {
  height: {
    lg: "4rem",
    md: "3rem",
    xs: "2rem",
  },
  width: {
    lg: "10rem",
    md: "8rem",
    xs: "2rem",
  },
  backgroundColor: {
    lg: "success.interactive",
    md: "danger.interactive",
    xs: "primary.interactive",
  },
  paddingX: {
    lg: "6",
    md: "4",
    xs: "none",
  },
  borderRadius: {
    lg: "0.5rem",
    md: "0.2rem",
    xs: "100%",
  },
};
