import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { text } from "@nimbus-ds/styles";

import { Text } from "./Text";

export default {
  title: "Atomic/Text",
  component: Text,
  subcomponents: { "Text.Skeleton": Text.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
    color: {
      options: Object.keys(text.properties.color),
    },
    textAlign: {
      control: { type: "radio" },
      options: text.properties.textAlign,
    },
    fontWeight: {
      control: { type: "radio" },
      options: Object.keys(text.properties.fontWeight),
    },
    fontSize: {
      control: { type: "radio" },
      options: Object.keys(text.properties.fontSize),
    },
    lineHeight: {
      control: { type: "radio" },
      options: Object.keys(text.properties.lineHeight),
    },
    lineClamp: {
      control: { type: "number" },
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
  <Text {...args} textAlign="center" />
);
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

export const responsive = Template.bind({});
responsive.args = {
  children: "Lorem ipsum dolor sit amet",
  textAlign: { xs: "center", md: "center", lg: "right", xl: "center" },
};

export const lineClamp = Template.bind({});
lineClamp.args = {
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et nisi sit amet quam convallis consectetur. Vestibulum hendrerit ac urna eget rhoncus. Aliquam non velit finibus sem gravida pretium. In neque metus, interdum a quam id, pulvinar consequat leo. Proin sapien mauris, efficitur ut mi at, finibus commodo metus. Pellentesque ac pellentesque risus. Nulla facilisi.",
  textAlign: "left",
  lineClamp: 1,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
