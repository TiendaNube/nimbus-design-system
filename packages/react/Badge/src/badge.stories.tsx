import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Badge } from "./Badge";

export default {
  title: "Atomic/Badge",
  component: Badge,
  subcomponents: { "Badge.Skeleton": Badge.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;
const SkeletonTemplate: ComponentStory<typeof Badge.Skeleton> = (args) => (
  <Badge.Skeleton {...args} />
);

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  count: "+99",
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  count: "+99",
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  count: "+99",
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  count: "+99",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  count: "+99",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
