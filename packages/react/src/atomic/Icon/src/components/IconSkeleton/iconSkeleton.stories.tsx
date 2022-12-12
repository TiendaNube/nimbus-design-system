import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { IconSkeleton } from "./IconSkeleton";

export default {
  title: "Skeleton/Icon",
  component: IconSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof IconSkeleton>;

const Template: ComponentStory<typeof IconSkeleton> = (args) => (
  <IconSkeleton {...args} />
);

export const icon = Template.bind({});
icon.args = {};
