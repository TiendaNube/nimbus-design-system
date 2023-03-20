import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Text } from "./Text";

export default {
  title: "Atomic/Text",
  component: Text,
  subcomponents: { "Text.Skeleton": Text.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;
const SkeletonTemplate: ComponentStory<typeof Text.Skeleton> = (args) => (
  <Text.Skeleton {...args} />
);

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
  color: "primary-textLow",
  children: "Lorem ipsum dolor sit amet",
};

export const success = Template.bind({});
success.args = {
  color: "success-textLow",
  children: "Lorem ipsum dolor sit amet",
};

export const warning = Template.bind({});
warning.args = {
  color: "warning-textLow",
  children: "Lorem ipsum dolor sit amet",
};

export const danger = Template.bind({});
danger.args = {
  color: "danger-textLow",
  children: "Lorem ipsum dolor sit amet",
};

export const neutral = Template.bind({});
neutral.args = {
  color: "neutral-textLow",
  children: "Lorem ipsum dolor sit amet",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
