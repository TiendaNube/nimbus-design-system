import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { ChipSkeleton } from "./ChipSkeleton";

export default {
  title: "Skeleton/Chip",
  component: ChipSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof ChipSkeleton>;

const Template: ComponentStory<typeof ChipSkeleton> = (args) => (
  <ChipSkeleton {...args} />
);

export const Chip = Template.bind({});
Chip.args = {};
