import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { BadgeSkeleton } from "./BadgeSkeleton";

export default {
  title: "Skeleton/Badge",
  component: BadgeSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof BadgeSkeleton>;

const Template: ComponentStory<typeof BadgeSkeleton> = (args) => (
  <BadgeSkeleton {...args} />
);

export const badge = Template.bind({});
badge.args = {};
