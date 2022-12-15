import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { RadioSkeleton } from "./RadioSkeleton";

export default {
  title: "Skeleton/Radio",
  component: RadioSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof RadioSkeleton>;

const Template: ComponentStory<typeof RadioSkeleton> = (args) => (
  <RadioSkeleton {...args} />
);

export const radio = Template.bind({});
radio.args = {};

export const button = Template.bind({});
button.args = { as: "button" };
