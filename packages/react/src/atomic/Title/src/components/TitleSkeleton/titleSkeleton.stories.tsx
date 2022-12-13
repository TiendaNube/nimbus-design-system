import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TitleSkeleton } from "./TitleSkeleton";

export default {
  title: "Skeleton/Title",
  component: TitleSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof TitleSkeleton>;

const Template: ComponentStory<typeof TitleSkeleton> = (args) => (
  <TitleSkeleton {...args} />
);

export const title = Template.bind({});
title.args = {};
