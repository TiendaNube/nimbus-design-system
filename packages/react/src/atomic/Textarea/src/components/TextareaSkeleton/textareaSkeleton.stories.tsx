import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TextareaSkeleton } from "./TextareaSkeleton";

export default {
  title: "Skeleton/Textarea",
  component: TextareaSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof TextareaSkeleton>;

const Template: ComponentStory<typeof TextareaSkeleton> = (args) => (
  <TextareaSkeleton {...args} />
);

export const textarea = Template.bind({});
textarea.args = {};
