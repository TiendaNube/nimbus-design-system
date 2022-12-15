import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { LabelSkeleton } from "./LabelSkeleton";

export default {
  title: "Skeleton/Label",
  component: LabelSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof LabelSkeleton>;

const Template: ComponentStory<typeof LabelSkeleton> = (args) => (
  <LabelSkeleton {...args} />
);

export const Label = Template.bind({});
Label.args = {};
