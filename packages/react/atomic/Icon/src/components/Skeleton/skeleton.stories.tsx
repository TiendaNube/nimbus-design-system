import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Skeleton } from "./Skeleton";

export default {
  title: "Skeleton/Icon",
  component: Skeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const icon = Template.bind({});
icon.args = {};
