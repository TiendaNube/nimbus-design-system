import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { AlertSkeleton } from "./AlertSkeleton";

export default {
  title: "Skeleton/Alert",
  component: AlertSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof AlertSkeleton>;

const Template: ComponentStory<typeof AlertSkeleton> = (args) => (
  <AlertSkeleton {...args} />
);

export const alert = Template.bind({});
alert.args = {};
