import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { LinkSkeleton } from "./LinkSkeleton";

export default {
  title: "Skeleton/Link",
  component: LinkSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof LinkSkeleton>;

const Template: ComponentStory<typeof LinkSkeleton> = (args) => (
  <LinkSkeleton {...args} />
);

export const link = Template.bind({});
link.args = {};
