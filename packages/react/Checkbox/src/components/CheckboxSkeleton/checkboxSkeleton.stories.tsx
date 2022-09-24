import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { CheckboxSkeleton } from "./CheckboxSkeleton";

export default {
  title: "Skeleton/Label",
  component: CheckboxSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof CheckboxSkeleton>;

const Template: ComponentStory<typeof CheckboxSkeleton> = (args) => (
  <CheckboxSkeleton {...args} />
);

export const Label = Template.bind({});
Label.args = {};
