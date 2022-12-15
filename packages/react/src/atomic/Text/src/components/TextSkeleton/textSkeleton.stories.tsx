import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TextSkeleton } from "./TextSkeleton";

export default {
  title: "Skeleton/Text",
  component: TextSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof TextSkeleton>;

const Template: ComponentStory<typeof TextSkeleton> = (args) => (
  <TextSkeleton {...args} />
);

export const Text = Template.bind({});
Text.args = {};
