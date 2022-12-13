import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { ToggleSkeleton } from "./ToggleSkeleton";

export default {
  title: "Skeleton/Toggle",
  component: ToggleSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof ToggleSkeleton>;

const Template: ComponentStory<typeof ToggleSkeleton> = (args) => (
  <ToggleSkeleton {...args} />
);

export const toggle = Template.bind({});
toggle.args = {};
