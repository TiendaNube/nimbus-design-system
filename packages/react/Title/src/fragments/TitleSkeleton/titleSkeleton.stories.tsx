import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TitleSkeleton } from "./TitleSkeleton";

export default {
  title: "Atomic/Title/Skeleton",
  component: TitleSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof TitleSkeleton>;

const Template: ComponentStory<typeof TitleSkeleton> = (args) => (
  <TitleSkeleton {...args} />
);

export const skeleton = Template.bind({});
skeleton.args = {};
