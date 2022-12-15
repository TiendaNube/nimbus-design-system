import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { ButtonSkeleton } from "./ButtonSkeleton";

export default {
  title: "Skeleton/Button",
  component: ButtonSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof ButtonSkeleton>;

const Template: ComponentStory<typeof ButtonSkeleton> = (args) => (
  <ButtonSkeleton {...args} />
);

export const button = Template.bind({});
button.args = {};
