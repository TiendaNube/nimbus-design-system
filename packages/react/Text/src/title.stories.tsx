import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Text } from "./Text";

export default {
  title: "Atomic/Text",
  component: Text,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const p = Template.bind({});
p.args = {
  as: "p",
  children: "Lorem ipsum dolor sit amet",
};

export const span = Template.bind({});
span.args = {
  as: "span",
  children: "Lorem ipsum dolor sit amet",
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: "Lorem ipsum dolor sit amet",
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  children: "Lorem ipsum dolor sit amet",
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  children: "Lorem ipsum dolor sit amet",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: "Lorem ipsum dolor sit amet",
};

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: "Lorem ipsum dolor sit amet",
};
