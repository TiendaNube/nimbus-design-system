import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { InputSkeleton } from "./InputSkeleton";

export default {
  title: "Skeleton/Input",
  component: InputSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof InputSkeleton>;

const Template: ComponentStory<typeof InputSkeleton> = (args) => (
  <InputSkeleton {...args} />
);

export const input = Template.bind({});
input.args = {};
