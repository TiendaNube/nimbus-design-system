import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Toggle } from "./Toggle";

export default {
  title: "Atomic/Toggle",
  component: Toggle,
  subcomponents: { "Toggle.Skeleton": Toggle.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;
const SkeletonTemplate: ComponentStory<typeof Toggle.Skeleton> = (args) => (
  <Toggle.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {};

export const active = Template.bind({});
active.args = {
  active: true,
};

export const label = Template.bind({});
label.args = {
  label: "Label",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
