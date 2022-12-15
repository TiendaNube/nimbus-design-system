import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { IconButtonSkeleton } from "./IconButtonSkeleton";

export default {
  title: "Skeleton/Icon Button",
  component: IconButtonSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof IconButtonSkeleton>;

const Template: ComponentStory<typeof IconButtonSkeleton> = (args) => (
  <IconButtonSkeleton {...args} />
);

export const iconButton = Template.bind({});
iconButton.args = {};
