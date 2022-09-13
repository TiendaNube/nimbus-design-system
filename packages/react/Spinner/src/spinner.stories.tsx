import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Spinner } from "./Spinner";

export default {
  title: "Atomic/Spinner",
  component: Spinner,
  argTypes: {
    source: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Spinner>;

const IconTemplate: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const large = IconTemplate.bind({});
large.args = {
  size: "large",
};

export const medium = IconTemplate.bind({});
medium.args = {
  size: "medium",
};

export const small = IconTemplate.bind({});
small.args = {
  size: "small",
};
