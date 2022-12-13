import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TagSkeleton } from "./TagSkeleton";

export default {
  title: "Skeleton/Tag",
  component: TagSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof TagSkeleton>;

const Template: ComponentStory<typeof TagSkeleton> = (args) => (
  <TagSkeleton {...args} />
);

export const tag = Template.bind({});
tag.args = {};
