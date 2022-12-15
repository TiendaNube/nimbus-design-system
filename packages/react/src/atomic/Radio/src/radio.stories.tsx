import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Radio } from "./Radio";

export default {
  title: "Atomic/Radio",
  component: Radio,
  subcomponents: { "Radio.Skeleton": Radio.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;
const SkeletonTemplate: ComponentStory<typeof Radio.Skeleton> = (args) => (
  <Radio.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = { label: "Label" };

export const disabled = Template.bind({});
disabled.args = {
  disabled: true,
  label: "Disabled",
};

export const button = Template.bind({});
button.args = {
  as: "button",
  label: "Button",
};

export const skeletonRadio = SkeletonTemplate.bind({});
skeletonRadio.args = {};

export const skeletonButton = SkeletonTemplate.bind({});
skeletonButton.args = { as: "button" };
