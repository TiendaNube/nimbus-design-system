import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Skeleton } from "./skeleton";

export default {
  title: "Atomic/Text/Text.Skeleton",
  component: Skeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {
  size: "base",
};

export const caption = Template.bind({});
caption.args = {
  size: "caption",
};

export const small = Template.bind({});
small.args = {
  size: "small",
};
