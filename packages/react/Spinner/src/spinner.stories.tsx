import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Spinner } from "./Spinner";

export default {
  title: "Atomic/Spinner",
  component: Spinner,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Spinner>;

const SpinnerTemplate: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const large = SpinnerTemplate.bind({});
large.args = {
  size: "large",
};

export const medium = SpinnerTemplate.bind({});
medium.args = {
  size: "medium",
};

export const small = SpinnerTemplate.bind({});
small.args = {
  size: "small",
};
