import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Checkbox } from "./Checkbox";

export default {
  title: "Atomic/Checkbox",
  component: Checkbox,
  subcomponents: { "Checkbox.Skeleton": Checkbox.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
const SkeletonTemplate: ComponentStory<typeof Checkbox.Skeleton> = (args) => (
  <Checkbox.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = { label: "Label" };

export const indeterminate = Template.bind({});
indeterminate.args = {
  indeterminate: true,
  label: "Indeterminate",
};

export const disabled = Template.bind({});
disabled.args = {
  checked: true,
  disabled: true,
  label: "Disabled",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  label: "Danger",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
