import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { box } from "@nimbus-ds/styles";

import { Box } from "./Box";

const spaces = [
  "padding",
  "paddingX",
  "paddingY",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "p",
  "pl",
  "pr",
  "pt",
  "pb",
  "px",
  "py",
  "margin",
  "marginX",
  "marginY",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "m",
  "ml",
  "mr",
  "mt",
  "mb",
  "mx",
  "my",
];

export default {
  title: "Atomic/Box",
  component: Box,
  argTypes: {
    children: { control: { disable: true } },
    backgroundColor: { options: Object.keys(box.properties.backgroundColor) },
    borderColor: { options: Object.keys(box.properties.borderColor) },
    borderStyle: { options: box.properties.borderStyle },
    cursor: { options: box.properties.cursor },
    ...spaces.reduce(
      (prev: { [key: string]: { options: string[] } }, curr: string) => {
        /* eslint-disable no-param-reassign */
        prev[curr] = {
          options: Object.keys(box.properties.space),
        };
        return prev;
      },
      {}
    ),
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const base = Template.bind({});
base.args = {
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
