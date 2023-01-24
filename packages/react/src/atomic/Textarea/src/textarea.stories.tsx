import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Textarea } from "./Textarea";

export default {
  title: "Atomic/Textarea",
  component: Textarea,
  subcomponents: { "Textarea.Skeleton": Textarea.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);
const SkeletonTemplate: ComponentStory<typeof Textarea.Skeleton> = (args) => (
  <Textarea.Skeleton {...args} />
);

export const textarea = Template.bind({});
textarea.args = {
  appearance: "neutral",
  lines: 2,
  id: "id",
  placeholder: "Placeholder text",
  disabled: false,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
