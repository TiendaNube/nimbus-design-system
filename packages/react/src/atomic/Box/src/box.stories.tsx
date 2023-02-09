import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { box } from "@nimbus-ds/styles";

import { Box } from "./Box";
import { BoxProps } from "./box.types";

export const Base: React.FC<BoxProps> = (props) => <Box {...props} />;

export default {
  title: "Atomic/Box",
  component: Base,
  argTypes: {
    children: { control: { disable: true } },
    as: {
      control: { disable: true },
      defaultValue: "div",
      description:
        "The underlying element to render — either a HTML element name or a React component.",
    },
    ref: {
      control: { disable: true },
      description:
        "A ref to the element rendered by this component. Because this component is polymorphic, the type will vary based on the value of the as prop.",
    },
    backgroundColor: { options: Object.keys(box.properties.backgroundColor) },
    borderColor: { options: Object.keys(box.properties.borderColor) },
    borderStyle: { options: box.properties.borderStyle },
    boxSizing: { options: box.properties.boxSizing },
    cursor: { options: box.properties.cursor },
    position: { options: box.properties.position },
    overflow: { options: box.properties.overflow },
    overflowX: { options: box.properties.overflowX },
    overflowY: { options: box.properties.overflowY },
    display: { options: box.properties.display },
    flexDirection: { options: box.properties.flexDirection },
    flexWrap: { options: box.properties.flexWrap },
    justifyContent: { options: box.properties.justifyContent },
    alignItems: { options: box.properties.alignItems },
    gridGap: { options: Object.keys(box.properties.gridGap) },
    gap: { options: Object.keys(box.properties.gap) },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Base>;

const Template: ComponentStory<typeof Base> = (args) => <Box {...args} />;

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
